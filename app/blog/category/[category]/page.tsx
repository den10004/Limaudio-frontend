"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { CardsResponse } from "@/types/card";
import CardSkeleton from "@/components/Loading/CardSkeleton";
import PopularWrapper from "@/components/PopularWrapper";
import Brands from "@/components/Brands";
import ScrollBtn from "@/components/ScrollBtn";
import Subscription from "@/components/Subscription/Subscription";
import PopularArticles from "@/components/PopularArticles";
import Hero from "@/components/Hero";
import BlogSimilar from "@/components/BlogSimilar";
import BlogCard from "@/components/BlogCard";
import Headline from "@/app/UI/headline";

const categoryMap = {
  obzory: "Обзоры",
  sravneniya: "Сравнения",
  topy: "Топы",
  "gaydy-i-sovety": "Гайды и советы",
};

export default function CategoryPage({ params }: any) {
  const resolvedParams = use(params);
  const category = resolvedParams.category;
  const decodedCategory = decodeURIComponent(category);
  const displayCategory = categoryMap[decodedCategory] || decodedCategory;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `/api/categories?category=${encodeURIComponent(displayCategory)}`
        );
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
  }, [displayCategory]);

  console.log(allCards);

  return (
    <>
      <div className="container2">
        <Headline text={displayCategory} />
      </div>
      <PopularWrapper />{" "}
      <div className="container2">
        <div className="interes__card">
          <div className="cards_container">
            {isLoading && <CardSkeleton heightPx="551px" />}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {!isLoading && !allCards && (
              <div style={{ fontSize: "40px", fontWeight: 600 }}>
                Нет доступных блогов
              </div>
            )}
            {allCards.data?.map((card) => (
              <BlogCard key={card.id} card={card} type="small" />
            ))}
          </div>
        </div>
      </div>
      <PopularArticles />
      <Brands />
      <Subscription />
      <ScrollBtn />
    </>
  );
}
