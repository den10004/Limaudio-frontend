"use client";

import { useState, useEffect } from "react";
import { use } from "react"; // Ensure React's use is imported
import { useRouter } from "next/navigation";
import { CardsResponse } from "@/types/card";
import CardSkeleton from "@/components/Loading/CardSkeleton";
import PopularWrapper from "@/components/PopularWrapper";
import Brands from "@/components/Brands";
import ScrollBtn from "@/components/ScrollBtn";
import Subscription from "@/components/Subscription/Subscription";
import PopularArticles from "@/components/PopularArticles";
import BlogCard from "@/components/BlogCard";
import Headline from "@/app/UI/headline";

type CategoryPageParams = {
  category: string;
};

type CategoryMap = {
  obzory: string;
  sravneniya: string;
  topy: string;
  "gaydy-i-sovety": string;
  [key: string]: string;
};

const categoryMap: CategoryMap = {
  obzory: "Обзоры",
  sravneniya: "Сравнения",
  topy: "Топы",
  "gaydy-i-sovety": "Гайды и советы",
};

export default function CategoryPage({
  params,
}: {
  params: Promise<CategoryPageParams>;
}) {
  const { category } = use(params); // Unwrap params with React.use()
  const decodedCategory = decodeURIComponent(category);
  const displayCategory =
    categoryMap[decodedCategory as keyof CategoryMap] || decodedCategory;
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

  console.log(allCards.data.length);

  return (
    <>
      <PopularWrapper />
      <div className="container2">
        <br />
        <Headline text={displayCategory} />
        <br />
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
      </div>
      <PopularArticles />
      <Brands />
      <Subscription />
      <ScrollBtn />
    </>
  );
}
