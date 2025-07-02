"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CardsResponse } from "@/types/card";
import CardSkeleton from "@/components/Loading/CardSkeleton";
import BlogCard from "@/components/BlogCard";

type ClientCategoryPageProps = {
  displayCategory: string;
};

export default function ClientCategoryPage({
  displayCategory,
}: ClientCategoryPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const searchParams = useSearchParams();
  const sortByDate = searchParams.get("sortByDate");
  const sortByPopularity = searchParams.get("sortByPopularity");
  const searchQuery = searchParams.get("searchQuery") || "";
  const tags = searchParams.getAll("tags[]");

  const tagsString = tags.join(",");

  useEffect(() => {
    const fetchCards = async () => {
      const queryParams = new URLSearchParams();

      if (sortByDate) queryParams.set("sortByDate", sortByDate);
      if (sortByPopularity)
        queryParams.set("sortByPopularity", sortByPopularity);
      if (searchQuery) queryParams.set("searchQuery", searchQuery);
      tags.forEach((tag) => tag && queryParams.append("tags[]", tag));
      queryParams.set("category", displayCategory);

      try {
        setIsLoading(true);
        const res = await fetch(`/api/blogs?${queryParams.toString()}`);
        if (!res.ok) throw new Error(await res.text());

        const cards = await res.json();
        setAllCards(cards);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [displayCategory, sortByDate, sortByPopularity, searchQuery, tagsString]);

  return (
    <div className="interes__card">
      <div className="cards_container">
        {isLoading && <CardSkeleton heightPx="551px" />}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!isLoading && allCards.data.length === 0 && (
          <div style={{ fontSize: "40px", fontWeight: 600 }}>
            Нет доступных блогов
          </div>
        )}
        {allCards.data?.map((card) => (
          <BlogCard key={card.id} card={card} type="small" />
        ))}
      </div>
    </div>
  );
}
