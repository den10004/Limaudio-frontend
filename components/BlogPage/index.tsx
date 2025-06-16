"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
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
    обзоры: "Обзоры",
    сравнения: "Сравнения",
    топы: "Топы",
    "гайды-и-советы": "Гайды и советы",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const mappedCategory = categoryMap[category] || [];
        const categories = Array.isArray(mappedCategory)
          ? mappedCategory
          : [mappedCategory];

        if (!categories.length) {
          throw new Error("Категория не найдена");
        }

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

  return (
    <>
      <div className="container">
        <h2 className="text-h3-bold" style={{ margin: "40px 0" }}>
          Блог
        </h2>
      </div>
      <section className="interes">
        <div className="container">
          <div className="interes__card">
            {isLoading && <CardSkeleton />}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {!isLoading && !articles && (
              <div style={{ fontSize: "40px", fontWeight: 600 }}>
                Нет доступных блогов
              </div>
            )}
            {error && <div style={{ color: "red" }}>error</div>}
            {articles.map((card) => (
              <BlogCard key={card.id} card={card} type="small" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
