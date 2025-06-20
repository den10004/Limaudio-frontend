"use client";
import { useEffect, useState } from "react";
import BlogSimilar from "@/components/BlogSimilar";
import { CardsResponse } from "@/types/card";
import "./styles.css";
import Headline from "@/app/UI/headline";
import CardSkeleton from "../Loading/CardSkeleton";

export default function BlockSimilarCard() {
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
    .slice(0, 4);

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
    <div className="blog__similar">
      <Headline text="Похожие статьи" />
      {isLoading && (
        <CardSkeleton heightPx="1558px" marginPx="20px" widthPx="100%" />
      )}
      {sortedCards.map((card) => (
        <BlogSimilar key={card.id} card={card} type="small" />
      ))}
    </div>
  );
}
