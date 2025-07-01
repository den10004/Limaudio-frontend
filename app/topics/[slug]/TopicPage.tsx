"use client";

import BlogCard from "@/components/BlogCard";
import Brands from "@/components/Brands";
import PopularArticles from "@/components/PopularArticles";
import { useEffect, useState } from "react";
import CardSkeleton from "@/components/Loading/CardSkeleton";

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  views: number;
  category: { name: string };
  topics: { title: string }[];
}

interface ApiResponse {
  data: Article[];
  meta: any;
}

interface Props {
  slug: string;
  topicLabel: string;
}

export default function TopicPage({ slug, topicLabel }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/blogs?topic=${encodeURIComponent(topicLabel)}&sortByDate=asc`,
          { headers: { Accept: "application/json" } }
        );

        if (!res.ok) {
          throw new Error(`Ошибка API: ${res.status}`);
        }

        const data: ApiResponse = await res.json();
        setArticles(data.data);
      } catch (err: any) {
        setError(err.message || "Произошла ошибка при загрузке данных.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [slug, topicLabel]);

  return (
    <>
      <div className="container">
        <div style={{ height: "20px" }}></div>
        <h1>{topicLabel}</h1>
        <div style={{ height: "20px" }}></div>

        {loading && <CardSkeleton />}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && articles.length === 0 && (
          <div style={{ fontSize: "40px", fontWeight: 600 }}>
            Нет доступных блогов
          </div>
        )}

        <div className="interes__card">
          <div className="cards_container">
            {articles.map((card) => (
              <BlogCard key={card.id} card={card} type="small" />
            ))}
          </div>
        </div>

        <PopularArticles />
      </div>
      <Brands />
    </>
  );
}
