"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import { CardsResponse } from "@/types/card";
import styles from "./page.module.css";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: string;
    category: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
  };
}

export default function BlogPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const categoryParam = searchParams.get("category") ?? "";

  const categoryMap: Record<string, string | string[]> = {
    обзоры: "Обзор",
    сравнения: "Статья",
    топы: "Топ",
    "гайды-и-советы": ["Гайд", "Совет"],
  };

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const category = "Обзор";
        const res = await fetch(
          `/api/category?category=${encodeURIComponent(category)}`
        );

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Ошибка при загрузке данных");
        }

        const { data } = await res.json();
        console.log("Данные от API:", data);
        setIsLoading(false);
      } catch (err) {
        console.error("Полная ошибка:", err);
        //setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <div className="container">
        <h2 className="text-h3-bold" style={{ margin: "40px 0" }}>
          Блог {category}
        </h2>
      </div>
      <section className={styles.interes}>
        <div className="container">
          {/*
          <div className={styles.interes__card}>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {!allCards && (
              <div style={{ color: "red" }}>Нет доступных блогов</div>
            )}
            {sortedCards.map((card) => (
              <BlogCard key={card.id} card={card} type="small" />
            ))}
          </div>*/}
        </div>
      </section>
    </>
  );
}
