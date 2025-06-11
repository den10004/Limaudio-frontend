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
  { slug: "сабвуферы", label: "Сабвуферы" },
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

  useEffect(() => {
    if (!slug) {
      setError("Тема не указана в URL.");
      setLoading(false);
      return;
    }

    // Map slug to label
    const normalizedSlug = decodeURIComponent(slug).toLowerCase();
    const link = links.find((l) => l.slug.toLowerCase() === normalizedSlug);
    const topic = link ? link.label : decodeURIComponent(slug); // Fallback to decoded slug

    async function fetchArticles() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/blogs?topic=${encodeURIComponent(topic)}&sortByDate=asc`,
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

  // Map slug to label for display
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  const link = links.find((l) => l.slug.toLowerCase() === normalizedSlug);
  const displayTopic = link ? link.label : decodeURIComponent(slug);


  console.log(articles)


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Статьи по теме: {displayTopic}</h1>
  
    </div>
  );
}