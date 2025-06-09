"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Tags from "../Tags";
import { useRouter, useSearchParams } from "next/navigation";

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

interface uniqueTags {
  createdAt: string;
  documentId: string;
  id: number;
  image: {
    documentId: string;
    id: string;
    url: string;
  };
  title: string;
  updatedAt: string;
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setAllTags] = useState<ApiResponse | null>(null);
  const [uniqueTags, SetUniqueTags] = useState<TagItem | null>(null);
  const [selectedTags, setSelectedTags] = useState<(string | null)[]>([]);
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("asc");
  const [sortByPopularity, setSortByPopularity] = useState<
    "popular" | "not_popular"
  >("popular");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const updateURLParams = (newParams: {
    sortByDate?: string;
    sortByPopularity?: string;
    searchQuery?: string;
    tags?: (string | null)[];
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newParams.sortByDate) params.set("sortByDate", newParams.sortByDate);
    if (newParams.sortByPopularity)
      params.set("sortByPopularity", newParams.sortByPopularity);
    if (newParams.searchQuery !== undefined)
      params.set("searchQuery", newParams.searchQuery);

    if (newParams.tags) {
      params.delete("tags[]"); // сначала очищаем, иначе будут дубли
      newParams.tags.forEach((tag) => tag && params.append("tags[]", tag));
    }

    router.push(`/?${params.toString()}`);
  };

  const toggleList = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleTagClick = (selectedTags: (string | null)[]) => {
    setSelectedTags(selectedTags);
    updateURLParams({ tags: selectedTags, searchQuery });
  };

  const handleSortByDate = () => {
    const newSort = sortByDate === "asc" ? "desc" : "asc";
    setSortByDate(newSort);
    setSortByPopularity("popular");
    updateURLParams({ sortByDate: newSort, sortByPopularity: "popular" });
  };

  const handleSortByPopularity = () => {
    const newPopularity =
      sortByPopularity === "popular" ? "not_popular" : "popular";
    setSortByPopularity(newPopularity);
    setSortByDate("asc");
    updateURLParams({ sortByPopularity: newPopularity, sortByDate: "asc" });
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateURLParams({ searchQuery: value, tags: selectedTags });
  };

  useEffect(() => {
    const fetchCards = async () => {
      const params = new URLSearchParams();
      if (sortByDate) params.set("sortByDate", sortByDate);
      if (sortByPopularity) params.set("sortByPopularity", sortByPopularity);
      if (debouncedSearchQuery) params.set("searchQuery", debouncedSearchQuery);
      if (selectedTags.length > 0) {
        selectedTags?.forEach(
          (tag, i) => tag && params.append(`tags[${i}]`, tag)
        );
      }

      const res = await fetch(`/api/blogs?${params.toString()}`);
      const data = await res.json();
      setAllTags(data);
      setIsLoading(false);
    };

    fetchCards();
  }, [
    sortByDate,
    sortByPopularity,
    debouncedSearchQuery,
    JSON.stringify(selectedTags),
  ]);

  useEffect(() => {
    if (tags?.data) {
      const uniqueTopicsMap = new Map();
      tags.data.forEach((item) => {
        item.topics?.forEach((topic: { title: any }) => {
          if (!uniqueTopicsMap.has(topic.title)) {
            uniqueTopicsMap.set(topic.title, topic);
          }
        });
      });

      const uniqueTopics: any = Array.from(uniqueTopicsMap.values());

      SetUniqueTags(uniqueTopics);
    }
  }, [tags]);

  return (
    <section className={styles.popular}>
      <div className="container">
        <div className={styles.popular__text}>
          <h3 className="text-h3-bold">Популярные темы</h3>
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
          {uniqueTags && (
            <Tags uniqueTags={uniqueTags} onTagClick={handleTagClick} />
          )}
        </ul>

        <div className={styles.popular__search}>
          <button className="text" onClick={handleSortByDate}>
            <div>
              <div className={`${styles.strip} ${styles.strip_1}`}></div>
              <div className={`${styles.strip} ${styles.strip_2}`}></div>
              <div className={`${styles.strip} ${styles.strip_3}`}></div>
            </div>
            По дате ({sortByDate === "asc" ? "возрастание" : "убывание"})
          </button>
          <button className="text" onClick={handleSortByPopularity}>
            <div>
              <div className={`${styles.strip} ${styles.strip_1}`}></div>
              <div className={`${styles.strip} ${styles.strip_2}`}></div>
              <div className={`${styles.strip} ${styles.strip_3}`}></div>
            </div>
            По популярности (
            {sortByPopularity === "popular" ? "популярные" : "не популярные"})
          </button>
          <input
            className={`${styles.search_input} text`}
            placeholder="Например, саундбар"
            value={searchQuery}
            onChange={handleSearchInput}
          />
        </div>
      </div>
    </section>
  );
}
