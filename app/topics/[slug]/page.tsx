"use client";

import BlogCard from "@/components/BlogCard";
import Brands from "@/components/Brands";
import PopularArticles from "@/components/PopularArticles";
import { linksTopics } from "@/lib/footerLinks";
import styles from "./page.module.css";
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



  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map slug to label
  const normalizedSlug: any = linksTopics.find((l) => l.slug.toLowerCase() === decodeURIComponent(slug || "").toLowerCase())?.label;


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


  const displayTopic = normalizedSlug;
  console.log(articles)
  return (
    <div className="container">

      <h1>{displayTopic}</h1>

      <div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {!articles && (
            <div style={{ color: "red" }}>Нет доступных блогов</div>
          )}
          {articles.map((card) => (
            <BlogCard key={card.id} card={card} type="small" />
          ))}
        </div>   
        {/*
        <PopularArticles />*/}
        <Brands />
    </div>
  );
}