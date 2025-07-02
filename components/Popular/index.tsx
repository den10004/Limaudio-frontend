"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Tags from "../Tags";
import styles from "./page.module.css";
import Headline from "@/app/UI/headline";
import CardSkeleton from "../Loading/CardSkeleton";

interface Image {
  id: number;
  documentId: string;
  url: string;
}

interface DataItem {
  topics: any;
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title?: string;
  image?: Image;
}

interface Pagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

interface Meta {
  pagination: Pagination;
}

interface ApiResponse {
  data: DataItem[];
  meta: Meta;
}

interface TagItem {
  id: number;
  title: string;
  image?: {
    url: string;
  };
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Popular() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topics, setTopics] = useState<any>();
  const [tags, setAllTags] = useState<ApiResponse | null>(null);
  const [uniqueTags, setUniqueTags] = useState<TagItem[]>([]);
  const [selectedTags, setSelectedTags] = useState<(string | null)[]>([]);
  const [sortByDate, setSortByDate] = useState<"asc" | "desc" | null>(null);
  const [sortByPopularity, setSortByPopularity] = useState<
    "popular" | "not_popular" | null
  >(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  useEffect(() => {
    const initialSortByDate = searchParams.get("sortByDate") as
      | "asc"
      | "desc"
      | null;
    const initialSortByPopularity = searchParams.get("sortByPopularity") as
      | "popular"
      | "not_popular"
      | null;
    const initialSearchQuery = searchParams.get("searchQuery") || "";
    const initialTags = searchParams.getAll("tags[]");

    if (!initialSortByDate && !initialSortByPopularity) {
      setSortByDate("desc");
      updateURLParams({
        sortByDate: "desc",
        tags: initialTags,
        searchQuery: initialSearchQuery,
      });
    } else {
      setSortByDate(initialSortByDate);
      setSortByPopularity(initialSortByPopularity);
      setSearchQuery(initialSearchQuery);
      setSelectedTags(initialTags.length > 0 ? initialTags : []);
    }
  }, [searchParams]);

  useEffect(() => {
    if (debouncedSearchQuery !== searchParams.get("searchQuery")) {
      updateURLParams({
        searchQuery: debouncedSearchQuery,
        tags: selectedTags,
      });
    }
  }, [debouncedSearchQuery]);

  const updateURLParams = (newParams: {
    sortByDate?: string | null;
    sortByPopularity?: string | null;
    searchQuery?: string;
    tags?: (string | null)[];
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newParams.sortByDate !== undefined) {
      if (newParams.sortByDate) {
        params.set("sortByDate", newParams.sortByDate);
        params.delete("sortByPopularity");
      } else {
        params.delete("sortByDate");
      }
    } else if (newParams.sortByPopularity !== undefined) {
      if (newParams.sortByPopularity) {
        params.set("sortByPopularity", newParams.sortByPopularity);
        params.delete("sortByDate");
      } else {
        params.delete("sortByPopularity");
      }
    }

    if (newParams.searchQuery !== undefined) {
      if (newParams.searchQuery) {
        params.set("searchQuery", newParams.searchQuery);
      } else {
        params.delete("searchQuery");
      }
    }

    if (newParams.tags) {
      params.delete("tags[]");
      newParams.tags.forEach((tag) => tag && params.append("tags[]", tag));
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleList = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleTagClick = (selectedTags: (string | null)[]) => {
    setSelectedTags(selectedTags);
    updateURLParams({ tags: selectedTags });
  };

  const handleSortByDate = () => {
    const newSort = sortByDate === "asc" ? "desc" : "asc";
    setSortByDate(newSort);
    setSortByPopularity(null);
    updateURLParams({ sortByDate: newSort });
  };

  const handleSortByPopularity = () => {
    const newPopularity =
      sortByPopularity === "popular" ? "not_popular" : "popular";
    setSortByPopularity(newPopularity);
    setSortByDate(null);
    updateURLParams({ sortByPopularity: newPopularity });
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  useEffect(() => {
    const fetchCards = async () => {
      const params = new URLSearchParams();
      const currentSortByDate = searchParams.get("sortByDate");
      const currentSortByPopularity = searchParams.get("sortByPopularity");
      const currentSearchQuery = searchParams.get("searchQuery") || "";
      const currentTags = searchParams.getAll("tags[]");

      if (currentSortByDate) {
        params.set("sortByDate", currentSortByDate);
      } else if (currentSortByPopularity) {
        params.set("sortByPopularity", currentSortByPopularity);
      }
      if (currentSearchQuery) {
        params.set("searchQuery", currentSearchQuery);
      }
      if (currentTags.length > 0) {
        currentTags.forEach((tag, i) => params.append(`tags[${i}]`, tag));
      }
      try {
        const res = await fetch(`/api/blogs?${params.toString()}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setAllTags(data);
        setIsLoading(false);
      } catch (err: any) {
        console.error("Error fetching cards:", err);
        setError(err.message || "Ошибка при загрузке данных");
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [searchParams]);

  useEffect(() => {
    if (tags?.data) {
      const uniqueTopicsMap = new Map();
      tags.data.forEach((item) => {
        item.topics?.forEach((topic: { title: string }) => {
          if (!uniqueTopicsMap.has(topic.title)) {
            uniqueTopicsMap.set(topic.title, topic);
          }
        });
      });

      const uniqueTopics: TagItem[] = Array.from(uniqueTopicsMap.values());
      setUniqueTags(uniqueTopics);
    }
  }, [tags]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/topic");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Ошибка при загрузке");
        }

        const cards = await res.json();
        const topics = cards.data;
        setTopics(topics);
        setIsLoadingTags(false);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchCards();
  }, []);

  return (
    <section className={styles.popular}>
      <div className={styles.popular__text}>
        <Headline text="Популярные темы" />
        <button
          className={`text-small ${styles.showbtnPopular}`}
          onClick={toggleList}
        >
          {isExpanded ? "Скрыть" : "Смотреть все"}
        </button>
      </div>
      <ul
        className={`${styles.popular__sort} ${
          !isExpanded ? styles.collapsed : ""
        }`}
        id="linksList"
      >
        {isLoadingTags && <CardSkeleton heightPx="112px" marginPx="10px" />}
        {uniqueTags && <Tags uniqueTags={topics} onTagClick={handleTagClick} />}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </ul>

      <div className={styles.popular__search}>
        <button className="text" onClick={handleSortByDate}>
          {sortByDate === "asc" ? (
            <div>
              <div className={`${styles.strip} ${styles.strip_1}`}></div>
              <div className={`${styles.strip} ${styles.strip_2}`}></div>
              <div className={`${styles.strip} ${styles.strip_3}`}></div>
            </div>
          ) : (
            <div>
              <div className={`${styles.strip} ${styles.strip_3}`}></div>
              <div className={`${styles.strip} ${styles.strip_2}`}></div>
              <div className={`${styles.strip} ${styles.strip_1}`}></div>
            </div>
          )}
          По дате
        </button>

        <button className="text" onClick={handleSortByPopularity}>
          {sortByPopularity === "popular" ? (
            <div>
              <div className={`${styles.strip} ${styles.strip_1}`}></div>
              <div className={`${styles.strip} ${styles.strip_2}`}></div>
              <div className={`${styles.strip} ${styles.strip_3}`}></div>
            </div>
          ) : (
            <div>
              <div className={`${styles.strip} ${styles.strip_3}`}></div>
              <div className={`${styles.strip} ${styles.strip_2}`}></div>
              <div className={`${styles.strip} ${styles.strip_1}`}></div>
            </div>
          )}
          По популярности
        </button>

        <input
          className={`${styles.search_input} text`}
          placeholder="Например, саундбар"
          value={searchQuery}
          onChange={handleSearchInput}
        />
      </div>
    </section>
  );
}
