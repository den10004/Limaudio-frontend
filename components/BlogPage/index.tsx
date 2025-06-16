"use client";
import { notFound, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import CardSkeleton from "../Loading/CardSkeleton";
import BlogMainWrapper from "@/components/BlogMainPageWrapper";
import PopularWrapper from "../PopularWrapper";

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
  const router = useRouter();
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
        setIsLoading(true);
        setError(null);
        /*
        if (!category) {
          const res = await fetch("/api/blogs");
          if (!res.ok) {
            throw new Error("Ошибка при загрузке всех статей");
          }
          const { data } = await res.json();
          setArticles(data);
          setIsLoading(false);
          return;
        }
*/
        const mappedCategory = categoryMap[category] || [];
        const categories = Array.isArray(mappedCategory)
          ? mappedCategory
          : [mappedCategory];

        if (!categories.length) {
          router.push("/blog");
          return;
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
        console.error("ошибка:", err);
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [category, router]);

  return (
    <>
      <div className="container">
        <h2 className="text-h3-bold" style={{ margin: "40px 0" }}>
          Блог
        </h2>
      </div>
      <section className="interes">
        <div className="container">
          {!category && (
            <>
              <PopularWrapper />
              <BlogMainWrapper />
            </>
          )}

          {!isLoading && !articles.length && (
            <div style={{ fontSize: "40px", fontWeight: 600 }}>
              Нет доступных блогов
            </div>
          )}
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className="interes__card">
            {isLoading && <CardSkeleton />}

            {articles.map((card) => (
              <BlogCard key={card.id} card={card} type="small" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
