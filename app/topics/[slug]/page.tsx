"use client";

import BlogCard from "@/components/BlogCard";
import Brands from "@/components/Brands";
import PopularArticles from "@/components/PopularArticles";
import { linksTopics } from "@/lib/footerLinks";
import { useParams } from "next/navigation";
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

export default function TopicPage() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizedSlug: any = linksTopics.find(
    (l) => l.slug.toLowerCase() === decodeURIComponent(slug || "").toLowerCase()
  )?.label;

  useEffect(() => {
    if (!slug) {
      setError("Тема не указана в URL.");
      setLoading(false);
      return;
    }

    if (!normalizedSlug) {
      setError("Тема не найдена.");
      setLoading(false);
      return;
    }

    async function fetchArticles() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/blogs?topic=${encodeURIComponent(
            normalizedSlug
          )}&sortByDate=asc`,
          {
            headers: {
              Accept: "application/json",
            },
          }
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
  }, [slug, normalizedSlug]);

  const displayTopic = normalizedSlug;

  return (
    <div className="container">
      <h1>{displayTopic}</h1>

      <div className="interes__card">
        {loading && <CardSkeleton />}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && articles.length === 0 && (
          <div style={{ fontSize: "40px", fontWeight: 600 }}>
            Нет доступных блогов
          </div>
        )}
        {articles.map((card) => (
          <BlogCard key={card.id} card={card} type="small" />
        ))}
      </div>

      <PopularArticles />
      <Brands />
    </div>
  );
}
