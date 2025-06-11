"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  console.log("useParams output:", params);

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Тема не указана в URL.");
      setLoading(false);
      return;
    }

    const topics = decodeURIComponent(slug)
      .split(",")
      .map((t) => t.replace(/[+|-|_]/g, " ").trim());

    async function fetchArticles() {
      setLoading(true);
      setError(null);

      try {
        const topicQueries = topics
          .map((t) => `topics[]=${encodeURIComponent(t)}`)
          .join("&");
        const res = await fetch(
          `/api/articles?${topicQueries}&sortByDate=asc`,
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
        console.log("Fetched articles:", data.data);
      } catch (err: any) {
        setError(err.message || "Произошла ошибка при загрузке данных.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Загрузка...</h1>
      </div>
    );
  }

  if (error || !slug) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Ошибка</h1>
        <p>{error || "Тема не указана."}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Статьи по темам: {decodeURIComponent(slug).replace(/[+|-|_]/g, " ").split(",").join(", ")}</h1>
      {articles.length === 0 ? (
        <p>Статьи по темам "{decodeURIComponent(slug).replace(/[+|-|_]/g, " ").split(",").join(", ")}" не найдены.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">
                <Link href={`/article/${article.slug}`}>{article.title}</Link>
              </h2>
              <p>{article.description.substring(0, 150)}...</p>
              <p className="text-sm text-gray-500">
                Опубликовано: {new Date(article.publishedAt).toLocaleDateString("ru-RU")}
              </p>
              <p className="text-sm text-gray-500">Просмотры: {article.views}</p>
              <p className="text-sm text-gray-500">Категория: {article.category.name}</p>
              <p className="text-sm text-gray-500">
                Темы: {article.topics.map((t) => t.title).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}