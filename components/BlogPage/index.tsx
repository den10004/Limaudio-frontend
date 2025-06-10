"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import { CardsResponse } from "@/types/card";
import styles from "./page.module.css";

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
  const [articles, setArticles] = useState<Response | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.append("populate", "category");

        const categoryValue = categoryMap[category as keyof typeof categoryMap];

        if (categoryValue) {
          if (Array.isArray(categoryValue)) {
            categoryValue.forEach((val, index) => {
              params.append(`filters[category][name][$in][${index}]`, val);
            });
          } else {
            params.append("filters[category][name][$eq]", categoryValue);
          }
        }

        const res = await fetch(`/api/category?${params.toString()}`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        setArticles(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

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
