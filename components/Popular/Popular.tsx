"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import Tags from "../Tags";

interface Image {
  id: number;
  documentId: string;
  url: string;
}

interface Topic {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
}

interface DataItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title?: string;
  views?: number;
  image?: Image;
  topics?: Topic[];
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
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Replace with your API token or JWT (e.g., from environment variable or auth context)
  const API_TOKEN = process.env.TOKEN || "";

  // Memoize fetch parameters to prevent unnecessary re-renders
  const fetchParams = useMemo(
    () => ({
      tag: selectedTag,
      sortByDate,
      sortByPopularity,
      searchQuery: debouncedSearchQuery,
    }),
    [selectedTag, sortByDate, sortByPopularity, debouncedSearchQuery]
  );

  // Form the fetch URL
  const formFetchUrl = (fetchParams: {
    tag: string | null;
    sortByDate: "asc" | "desc";
    sortByPopularity: "popular" | "not_popular";
    searchQuery: string;
  }) => {
    const baseUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:8000";
    const queryParams = new URLSearchParams();

    // Add filters for tag (matches onTagClick, e.g., "Домашний кинотеатр")
    if (fetchParams.tag) {
      queryParams.append("filters[topics][title][$eq]", fetchParams.tag);
    }

    // Add search filter for title
    if (fetchParams.searchQuery) {
      queryParams.append("filters[title][$containsi]", fetchParams.searchQuery);
    }

    // Add sorting (popularity by views or date by publishedAt)
    if (fetchParams.sortByPopularity !== "popular") {
      queryParams.append(
        "sort[0]",
        `views:${
          fetchParams.sortByPopularity === "not_popular" ? "asc" : "desc"
        }`
      );
    } else {
      queryParams.append("sort[0]", `publishedAt:${fetchParams.sortByDate}`);
    }

    // Populate related data
    queryParams.append("populate", "topics,image");

    return `${baseUrl}/api/articles?${queryParams.toString()}`;
  };

  // Toggle list visibility
  const toggleList = () => {
    setIsExpanded((prev) => !prev);
  };

  // Handle tag selection
  const handleTagClick = useCallback((tagTitle: string | null) => {
    setSelectedTag(tagTitle);
    console.log("Parent: Selected tag -", tagTitle);
  }, []);

  // Toggle sort by date
  const handleSortByDate = useCallback(() => {
    setSortByDate((prev) => (prev === "asc" ? "desc" : "asc"));
    setSortByPopularity("popular"); // Reset to default popularity sort
  }, []);

  // Toggle sort by popularity
  const handleSortByPopularity = useCallback(() => {
    setSortByPopularity((prev) =>
      prev === "popular" ? "not_popular" : "popular"
    );
    setSortByDate("asc"); // Reset to default date sort
  }, []);

  // Handle search input
  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  // Fetch data from Strapi when fetchParams change
  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = formFetchUrl(fetchParams);
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (API_TOKEN) {
          headers["Authorization"] = `Bearer ${API_TOKEN}`;
        }

        const res = await fetch(url, { headers });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            text ||
              "Ошибка при загрузке данных из Strapi (возможно, доступ запрещен)"
          );
        }

        const response = await res.json();

        // Map Strapi response to component's expected format
        const formattedData: ApiResponse = {
          data: response.data.map((item: any) => ({
            id: item.id,
            documentId: item.attributes.documentId || item.id.toString(),
            createdAt: item.attributes.createdAt,
            updatedAt: item.attributes.updatedAt,
            publishedAt: item.attributes.publishedAt,
            title: item.attributes.title,
            views: item.attributes.views,
            image: item.attributes.image?.data
              ? {
                  id: item.attributes.image.data.id,
                  documentId:
                    item.attributes.image.data.attributes.documentId ||
                    item.attributes.image.data.id.toString(),
                  url: item.attributes.image.data.attributes.url,
                }
              : undefined,
            topics: item.attributes.topics, // Matches provided structure
          })),
          meta: response.meta,
        };

        setAllTags(formattedData);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [fetchParams, API_TOKEN]);

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
            По просмотрам (
            {sortByPopularity === "popular" ? "популярные" : "не популярные"})
          </button>
          <input
            className={`${styles.search_input} text`}
            placeholder="Поиск по заголовку, например, саундбар"
            value={searchQuery}
            onChange={handleSearchInput}
          />
        </div>
        {error && (
          <div className={styles.error}>
            {error.includes("403")
              ? "Доступ запрещен: проверьте настройки Strapi или токен"
              : error}
          </div>
        )}
        {isLoading && <div className={styles.loading}>Загрузка...</div>}
      </div>
    </section>
  );
}
