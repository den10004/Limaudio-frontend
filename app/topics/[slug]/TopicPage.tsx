"use client";
/*
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

interface Topic {
  title: string;
  articles: Article[];
}

interface TopicApiResponse {
  data: Topic[];
  meta: any;
}

interface Props {
  slug: string;
  topicLabel: string;
}

export default function TopicPage({ slug, topicLabel }: Props) {
  // const [articles, setArticles] = useState<Article[]>([]);
  const [topic, setTopic] = useState<Article[] | null>(null);
  const [topicFirst, setTopicFirst] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/topic");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Ошибка при загрузке");
        }
        setLoading(false);
        const topicsData: TopicApiResponse = await res.json();
        setTopics(topicsData.data);

        setTopicFirst(topicsData.data?.[0]?.articles || null);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCards();
  }, []);

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

        // const data: ApiResponse = await res.json();
        //  setArticles(data.data);
      } catch (err: any) {
        setError(err.message || "Произошла ошибка при загрузке данных.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [slug, topicLabel]);

  useEffect(() => {
    const matchingTopics = topics.filter(
      (topic: Topic) => topic.title === topicLabel
    );
    console.log("matchingTopics", matchingTopics);
    if (matchingTopics.length > 0) {
      setTopic(matchingTopics[0].articles);
    } else {
      setTopic(null);
    }
  }, [topics, topicLabel]);

  return (
    <>
      <div className="container">
        <div style={{ height: "20px" }}></div>
        <h1>{topicLabel}</h1>
        <div style={{ height: "20px" }}></div>

        {loading && <CardSkeleton />}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && topic?.length === 0 && (
          <div style={{ fontSize: "40px", fontWeight: 600 }}>
            Нет доступных блогов
          </div>
        )}

        <div className="interes__card">
          <div className="cards_container">
            {topic?.map((card: Article) => (
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
*/

import BlogCard from "@/components/BlogCard";
import Brands from "@/components/Brands";
import PopularArticles from "@/components/PopularArticles";
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

interface Topic {
  title: string;
  articles: Article[];
}

interface TopicApiResponse {
  data: Topic[];
  meta: any;
}

interface Props {
  slug: string;
  topicLabel: string;
  matchingTopics: Topic[];
  error: string | null;
}

export default function TopicPage({
  slug,
  topicLabel,
  matchingTopics: initialMatchingTopics,
  error: initialError,
}: Props) {
  const [articles, setArticles] = useState<Article[]>(
    initialMatchingTopics.length > 0 ? initialMatchingTopics[0].articles : []
  );
  const [error, setError] = useState<string | null>(initialError);
  const [topics, setTopics] = useState<Topic[]>(initialMatchingTopics);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/topic");
        if (!res.ok) {
          throw new Error("Ошибка при загрузке");
        }
        const topicsData: TopicApiResponse = await res.json();
        setTopics(topicsData.data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (!initialMatchingTopics.length) {
      fetchCards();
    }
  }, [initialMatchingTopics]);

  useEffect(() => {
    const matchingTopics = topics.filter(
      (topic: Topic) => topic.title === topicLabel
    );
    // console.log("matchingTopics", matchingTopics);
    if (matchingTopics.length > 0) {
      setArticles(matchingTopics[0].articles);
    } else {
      setArticles([]);
    }
  }, [topics, topicLabel]);

  return (
    <>
      <div className="container">
        <div style={{ height: "20px" }}></div>
        <h1>{topicLabel}</h1>
        <div style={{ height: "20px" }}></div>

        {error && <div style={{ color: "red" }}>{error}</div>}
        {!error && articles.length === 0 && (
          <div style={{ fontSize: "40px", fontWeight: 600 }}>
            Нет доступных блогов
          </div>
        )}

        <div className="interes__card">
          <div className="cards_container">
            {articles.map((card: Article) => (
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
