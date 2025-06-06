"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
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
interface TagsProps {
  tags?: ApiResponse[];
}

export default function Popular() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setAllTags] = useState<ApiResponse | null>(null);
  const [click, setClick] = useState<string | null>(null);

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

  const tag: any = tags?.data;

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
          {tags && <Tags onTagClick={setClick} tags={tag} />}
        </ul>

        <div className={styles.popular__search}>
          <button className="text">
            <div>
              <div className={`${styles.strip} ${styles.strip_1}`}></div>
              <div className={`${styles.strip} ${styles.strip_2}`}></div>
              <div className={`${styles.strip} ${styles.strip_3}`}></div>
            </div>
            По дате
          </button>
          <button className="text">
            <div>
              <div className={`${styles.strip} ${styles.strip_1}`}></div>
              <div className={`${styles.strip} ${styles.strip_2}`}></div>
              <div className={`${styles.strip} ${styles.strip_3}`}></div>
            </div>
            По популярности
          </button>
          <input
            className={`${styles.search_input} text`}
            placeholder="Например, саундбар"
          />
        </div>
      </div>
    </section>
  );
}
