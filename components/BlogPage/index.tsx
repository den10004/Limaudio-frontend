"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import { CardsResponse } from "@/types/card";
import styles from "./page.module.css";
import CardSkeleton from "../Loading/CardSkeleton";

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
        // Get the mapped category value(s) or default to empty array if not found
        const mappedCategory = categoryMap[category] || [];
        // Normalize to array for consistent handling
        const categories = Array.isArray(mappedCategory)
          ? mappedCategory
          : [mappedCategory];

        if (!categories.length) {
          throw new Error("Категория не найдена");
        }

        // Fetch data for each category
        const fetchPromises = categories.map(async (cat) => {
          const res = await fetch(
            `/api/category?category=${encodeURIComponent(cat)}`
          );

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
              errorData.error || `Ошибка при загрузке данных для ${cat}`
            );
          }

          const { data } = await res.json();
          return data;
        });

        const results = await Promise.all(fetchPromises);
        const combinedArticles = results.flat();
        setArticles(combinedArticles);
        setIsLoading(false);
      } catch (err) {
        console.error("Полная ошибка:", err);
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [category]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(articles);
  return (
    <>
      <div className="container">
        <h2 className="text-h3-bold" style={{ margin: "40px 0" }}>
          Блог
        </h2>
      </div>
      <section className={styles.interes}>
        <div className="container">
          <div className={styles.interes__card}>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {isLoading && <CardSkeleton />}
            {!articles && (
              <div style={{ color: "red" }}>Нет доступных блогов</div>
            )}
            {articles.map((card) => (
              <BlogCard key={card.id} card={card} type="small" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
