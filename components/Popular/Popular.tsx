"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState, useCallback } from "react";
import Tags from "../Tags";

interface Image {
  id: number;
  documentId: string;
  url: string;
}

interface DataItem {
  id: number;
  documentId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt: string; // ISO date string
  title?: string; // Optional as not all items might have it
  image?: Image; // Optional as not all items might have it
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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/topics");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Ошибка при загрузке");
        }

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

  const handleTagClick = (tagTitle: string | null) => {
    setSelectedTag(tagTitle);
    console.log("Parent: Selected tag -", tagTitle);
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

  const fetchData = {
    tag: selectedTag,
    sortByDate: sortByDate,
    sortByPopularity: sortByPopularity,
    searchQuery: debouncedSearchQuery,
  };

  console.log("Collected fetch data:", fetchData);

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
