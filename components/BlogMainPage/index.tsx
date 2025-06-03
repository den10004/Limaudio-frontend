"use client";
import { useEffect, useState } from "react";
import "./blogmainpage.css";
import { Card, CardsResponse } from "@/types/card";
import BlogCard from "../BlogCard";

type GroupedCard = {
  type: "big" | "small";
  cards: Card[];
};

const groupCards = (cards: Card[]): GroupedCard[] => {
  if (!cards || cards.length === 0) return [];

  const grouped: GroupedCard[] = [];
  let i = 0;

  while (i < cards.length) {
    grouped.push({ type: "big", cards: [cards[i]] });
    i++;
    if (i < cards.length) {
      const group = cards.slice(i, i + 3);
      grouped.push({ type: "small", cards: group });
      i += 3;
    }
  }

  return grouped;
};

export default function BlogMainPage() {
  const INITIAL_VISIBLE_GROUPS = 4;
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

  const [visibleGroups, setVisibleGroups] = useState(INITIAL_VISIBLE_GROUPS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const groupedCards = groupCards(allCards.data);
  const visibleGrouped = groupedCards.slice(0, visibleGroups);
  const showMore = () => setVisibleGroups((prev) => prev + 2);

  if (isLoading) return <div className="container">Загрузка...</div>;
  if (error) return <div className="container error-message">{error}</div>;
  if (!allCards.data.length)
    return <div className="container">Нет доступных блогов</div>;

  return (
    <div className="container">
      <div className="cards-container">
        {visibleGrouped.map((group, index) => (
          <div
            key={index}
            className={`row ${group.type === "big" ? "big-row" : "small-row"}`}
          >
            {group.cards.map((card, i) => (
              <BlogCard key={i} card={card} type={group.type} />
            ))}
          </div>
        ))}
      </div>

      {visibleGroups < groupedCards.length && (
        <div className="show-more-wrapper">
          <button onClick={showMore} className="showbtn text">
            Посмотреть все
          </button>
        </div>
      )}
    </div>
  );
}
