"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useMemo, useState } from "react";
import Tags from "../Tags";

interface Image {
  id: number;
  documentId: string;
  url: string;
}

interface DataItem {
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

interface fetchData {
  tags: (string | null)[];
  sortByDate: "asc" | "desc" | undefined;
  sortByPopularity: "popular" | "not_popular" | undefined;
  searchQuery: string | undefined;
}

// Custom debounce hook
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setAllTags] = useState<ApiResponse | null>(null);
  const [cards, setAllCards] = useState<ApiResponse | null>(null); // New state for blog cards
  const [selectedTags, setSelectedTags] = useState<(string | null)[]>([]);
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("asc");
  const [sortByPopularity, setSortByPopularity] = useState<
    "popular" | "not_popular"
  >("popular");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Debounce the search query with a 500ms delay
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const toggleList = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleTagClick = (selectedTags: (string | null)[]) => {
    setSelectedTags(selectedTags);
  };

  const handleSortByDate = () => {
    setSortByDate((prev) => (prev === "asc" ? "desc" : "asc"));
    setSortByPopularity("popular");
  };

  const handleSortByPopularity = () => {
    setSortByPopularity((prev) =>
      prev === "popular" ? "not_popular" : "popular"
    );
    setSortByDate("asc");
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const fetchData = useMemo(
    () => ({
      tags: selectedTags,
      sortByDate: sortByDate,
      sortByPopularity: sortByPopularity,
      searchQuery: debouncedSearchQuery,
    }),
    [selectedTags, sortByDate, sortByPopularity, debouncedSearchQuery]
  );

  console.log(fetchData);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(
          `/api/blogs?${new URLSearchParams(fetchData).toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const cards = await res.json();
        setAllTags(cards);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

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
          {tags && <Tags tags={tags.data} onTagClick={handleTagClick} />}
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
