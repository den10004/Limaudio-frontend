"use client";
import { useEffect, useState } from "react";
import "./blogmainpage.css";
import BlogCard from "../BlogCard";

type Card = {
  id: string;
  title: string;
  image: string;
  tags: any;
  galery: any;
  date: string;
  author: string;
};

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

const INITIAL_VISIBLE_GROUPS = 4;

export default function BlogMainPage() {
  const [allCards, setAllCards] = useState<Card[]>([]);
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

        const strapiData = await res.json();

        console.log(strapiData);
        setAllCards(cards);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU");
  };

  const groupedCards = groupCards(allCards);
  const visibleGrouped = groupedCards.slice(0, visibleGroups);

  const showMore = () => setVisibleGroups((prev) => prev + 2);

  if (isLoading) return <div className="container">Загрузка...</div>;
  if (error) return <div className="container error-message">{error}</div>;
  if (!allCards.length)
    return <div className="container">Нет доступных блогов</div>;

  return (
    <div className="container">
      <div className="cards-container">
        {visibleGrouped.map((group, index) => (
          <div
            key={index}
            className={`row ${group.type === "big" ? "big-row" : "small-row"}`}
          >
            {group.cards.map((card) => (
              <BlogCard key={card.id} card={card} type={group.type} />
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
