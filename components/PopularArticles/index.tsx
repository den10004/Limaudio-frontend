"use client";

import { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import styles from "./page.module.css";
import { CardsResponse } from "@/types/card";

export default function PopularArticles() {
  const [allCards, setAllCards] = useState<CardsResponse>({
    data: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 0,
        total: 0,
      },
    },
    length: undefined,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sortedCards = [...allCards.data]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Ошибка при загрузке");
        }

        const cards = await res.json();

        setAllCards(cards);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);
  if (isLoading) return <div className="container">Загрузка...</div>;
  if (error) return <div className="container error-message">{error}</div>;
  if (!allCards.data.length)
    return <div className="container">Нет доступных блогов</div>;

  return (
    <section className={styles.interes}>
      <div className="container">
        <h3 className="text-h3-bold">Популярные статьи</h3>
        <div className={styles.interes__card}>
          {sortedCards.map((card) => (
            <BlogCard key={card.id} card={card} type="small" />
          ))}
        </div>
      </div>
    </section>
  );
}
