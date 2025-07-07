"use client";
import { useEffect, useState } from "react";
import BlogCard, { Card } from "../BlogCard";
import { CardsResponse } from "@/types/card";
import { useSearchParams } from "next/navigation";
import CardSkeleton from "../Loading/CardSkeleton";

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
  const searchParams = useSearchParams();
  const sortByDate = searchParams.get("sortByDate");
  const sortByPopularity = searchParams.get("sortByPopularity");
  const searchQuery = searchParams.get("searchQuery") || "";
  const tags = searchParams.getAll("tags[]");

  const INITIAL_VISIBLE_GROUPS = 8;

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
        setIsLoading(true);
        const queryParams = new URLSearchParams();

        if (sortByDate) queryParams.set("sortByDate", sortByDate);
        if (sortByPopularity)
          queryParams.set("sortByPopularity", sortByPopularity);
        if (searchQuery) queryParams.set("searchQuery", searchQuery);
        tags.forEach((tag) => tag && queryParams.append("tags[]", tag));

        const res = await fetch(`/api/blogs?${queryParams.toString()}`);
        if (!res.ok) throw new Error(await res.text());

        const cards = await res.json();
        setAllCards(cards);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [sortByDate, sortByPopularity, searchQuery, tags.join(",")]);

  const groupedCards = groupCards(allCards.data);
  const visibleGrouped = groupedCards.slice(0, visibleGroups);
  const showMore = () => setVisibleGroups((prev) => prev + 3);

  return (
    <>
      <div className="container2" style={{ marginTop: "20px" }}>
        <div className="cards_container">
          {visibleGrouped.map((group, index) => (
            <div
              key={index}
              className={`row ${
                group.type === "big" ? "big-row" : "small-row"
              }`}
            >
              {group.cards.map((card, i) => (
                <BlogCard key={i} card={card} type={group.type} />
              ))}
            </div>
          ))}
          {isLoading && <CardSkeleton heightPx="1317px" />}
          {error && <div style={{ color: "red" }}>{error}</div>}
          {!isLoading && allCards.data.length === 0 && (
            <div style={{ fontSize: "40px", fontWeight: 600 }}>
              Нет доступных блогов
            </div>
          )}
        </div>
        {visibleGroups < groupedCards.length && (
          <div className="show-more-wrapper">
            <button onClick={showMore} className="showbtn text">
              Показать еще
            </button>
          </div>
        )}
      </div>
    </>
  );
}
