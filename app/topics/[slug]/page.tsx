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

const links = [
  { slug: "полочная-акустика", label: "Полочная акустика" },
  { slug: "встраиваемая-акустика", label: "Встраиваемая акустика" },
  { slug: "dolby-atmos", label: "Dolby Atmos" },
  { slug: "cабвуферы", label: "Сабвуферы" },
  { slug: "av-ресиверы", label: "AV Ресиверы" },
  { slug: "цапы", label: "ЦАПы" },
  { slug: "комплекты-акустики", label: "Комплекты акустики" },
  { slug: "av-процессоры", label: "AV Процессоры" },
  { slug: "предусилители", label: "Предусилители" },
  { slug: "усилители", label: "Усилители" },
  { slug: "сетевые-проигрыватели", label: "Сетевые проигрыватели" },
  { slug: "проигрыватели-винила", label: "Проигрыватели винила" },
  { slug: "фонокорректоры", label: "Фонокорректоры" },
  { slug: "проекторы-и-экраны", label: "Проекторы и экраны" },
  { slug: "домашний-кинотеатр", label: "Домашний кинотеатр" },
  { slug: "hi-fi-звук", label: "Hi-Fi звук" },
  { slug: "акустика", label: "Акустика" },
];

export default function TopicPage() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;



  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map slug to label
  const normalizedSlug = links.find((l) => l.slug.toLowerCase() === decodeURIComponent(slug || "").toLowerCase())?.label;
  console.log(normalizedSlug)

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
          `/api/blogs?topic=${encodeURIComponent(normalizedSlug)}&sortByDate=asc`,
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
  }, [slug, normalizedSlug]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Загрузка...</h1>
      </div>
    );
  }

  if (error || !slug || !normalizedSlug) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Ошибка</h1>
        <p>{error || "Тема не указана."}</p>
      </div>
    );
  }

  // Use normalizedSlug for display
  const displayTopic = normalizedSlug;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Статьи по теме: {displayTopic}</h1>
      {articles.length === 0 ? (
        <p>Статьи по теме "{displayTopic}" не найдены.</p>
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