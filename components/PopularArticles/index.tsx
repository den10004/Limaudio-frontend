"use client";

import { CSSProperties, useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import { CardsResponse } from "@/types/card";
import Headline from "@/app/UI/headline";
import CardSkeleton from "../Loading/CardSkeleton";

export default function PopularArticles({
  gridStyle,
  paddingStyle,
  headstyle,
}: {
  gridStyle?: string;
  paddingStyle?: string;
  headstyle?: CSSProperties;
}) {
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

  return (
    <div
      className="container2"
      style={{ marginTop: "30px", padding: paddingStyle }}
    >
      <Headline text="Популярные статьи" headstyle={headstyle} />

      <div className="interes__card">
        {isLoading && <CardSkeleton heightPx="551px" />}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!isLoading && !allCards && (
          <div style={{ fontSize: "40px", fontWeight: 600 }}>
            Нет доступных блогов
          </div>
        )}
        <div className="cards_container" style={{ grid: gridStyle }}>
          {sortedCards.map((card) => (
            <BlogCard key={card.id} card={card} type="small" />
          ))}
        </div>
      </div>
    </div>
  );
}
