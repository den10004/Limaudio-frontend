/*
import qs from "qs";

if (!process.env.API_URL || !process.env.TOKEN) {
  throw new Error("Missing API_URL or TOKEN in environment variables");
}

export async function getBrandsBySlug(slug: string): Promise<any | null> {
  const query = qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${process.env.API_URL}/topics?${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Error fetching article:", res.status);
    return null;
  }

  const data = await res.json();
  const brand = data?.data?.[0] ?? null;

  return brand;
  // return data?.data?.[0] ?? null;
}
*/
// lib/topicUtils.ts
import qs from "qs";

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

interface Seo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaKeys: string;
  shareImage: any;
}

interface Topic {
  title: string;
  articles: Article[];
  image?: { id: number; documentId: string; url: string };
  seo?: Seo;
}

export async function getMatchingTopics(topicLabel: string): Promise<Topic[]> {
  const query = qs.stringify(
    {
      populate: {
        image: {
          fields: ["url"],
        },
        articles: { populate: "*" },
        seo: { populate: "*" },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${process.env.API_URL}/topics?${query}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Ошибка при загрузке данных");
  }
  const topicsData: { data: Topic[] } = await res.json();
  return topicsData.data.filter((topic: Topic) => topic.title === topicLabel);
}
