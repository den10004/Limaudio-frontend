"use client";
import { notFound, useParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollBtn from "@/components/ScrollBtn";
import { INDEX } from "@/lib/breadcrumbs";
import styles from "./page.module.css";
import Comments from "@/components/Comments";
import Tags from "@/components/Tags";
import ApplicationForm from "@/components/ApplicationForm";
import Share from "@/components/Share";
import { getArticleBySlug } from "@/app/api/article/api";
import { Articles } from "@/types/articles";
import MarkdownBlog from "@/components/MarkdownBlog";
import { FormatDate } from "@/utils/formatDate";
import BlockSimilarCard from "@/components/BlogSimilar/BlockSimilarCard";
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

export default async function BlogPostPage({ params }: any) {
  const content: Articles | null = await getArticleBySlug(params.slug);

  const breadcrumbs = [
    { label: "Акустика", href: INDEX },
    { label: "Сравнения", href: "" },
    {
      label: content?.title ?? "",
      href: "",
      isActive: true,
    },
  ];
  const { slug } = useParams<{ slug: string }>();
  const topic = decodeURIComponent(slug).replace(/-/g, " ");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/articles?topic=${encodeURIComponent(topic)}&sortByDate=asc`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Не удалось загрузить статьи.");
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
  }, [topic]);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section>
        <div className="container">
          <h3 className="text-h3-bold">Топик</h3>
          {}
        </div>
      </section>
      <ScrollBtn />
    </>
  );
}
