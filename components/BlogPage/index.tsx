"use client";
import { notFound, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import BlogCard from "../BlogCard";
import CardSkeleton from "../Loading/CardSkeleton";
import BlogMainWrapper from "@/components/BlogMainPageWrapper";
import PopularWrapper from "../PopularWrapper";
import Headline from "@/app/UI/headline";
import "./../../styles/interes.css";

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
  const [gridColumns, setGridColumns] = useState("repeat(3, 1fr)");

  useLayoutEffect(() => {
    const updateGrid = () => {
      setGridColumns(
        window.innerWidth <= 1000 ? "repeat(1, 1fr)" : "repeat(3, 1fr)"
      );
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

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
            `/api/blogs?category=${encodeURIComponent(cat)}`
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
        <Headline text={"Блог"} stylecss={{ marginTop: "40px" }} />

        {!category && (
          <>
            <BlogMainWrapper />
          </>
        )}
        {!isLoading && articles.length === 0 && (
          <div style={{ fontSize: "40px", fontWeight: 600, height: "20px" }}>
            Нет доступных блогов
          </div>
        )}

        {isLoading && <CardSkeleton heightPx="531px" marginPx="20px" />}
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div className="cards_container">
          <div
            style={{
              marginTop: "10px",
              display: "grid",
              gridTemplateColumns: gridColumns,
              gap: "22px",
            }}
          >
            {articles.map((card) => (
              <div key={card.id}>
                <BlogCard card={card} type="small" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
