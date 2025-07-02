import { Metadata } from "next";
import { notFound } from "next/navigation";
import { linksTopics } from "@/lib/footerLinks";
import TopicPage from "./TopicPage";
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

interface Params {
  slug: string;
}

export async function getMatchingTopics(topicLabel: string) {
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
  const topicsData: any = await res.json();
  return topicsData.data.filter(
    (topic: { title: string }) => topic.title === topicLabel
  );
}

function getTopicLabel(slug: string): string | null {
  const topic = linksTopics.find(
    (l) => l.slug.toLowerCase() === decodeURIComponent(slug).toLowerCase()
  );
  return topic ? topic.label : null;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const label = getTopicLabel(params.slug);

  if (!label) {
    return {
      title: "Тема не найдена",
      description: "Запрошенная тема отсутствует на сайте.",
    };
  }

  try {
    const matchingTopics: Topic[] = await getMatchingTopics(label);
    if (matchingTopics.length > 0 && matchingTopics[0].seo) {
      const { metaTitle, metaDescription } = matchingTopics[0].seo;
      return {
        title: metaTitle || label,
        description: metaDescription || `Читайте статьи на тему ${label}.`,
      };
    }
  } catch (err) {
    console.error(err);
  }

  return {
    title: `${label}`,
    description: `Читайте статьи на тему ${label}.`,
  };
}

export default async function TopicPageWrapper({ params }: { params: Params }) {
  const label = getTopicLabel(params.slug);

  if (!label) {
    notFound();
  }

  let matchingTopics: Topic[] = [];
  let error: string | null = null;

  try {
    matchingTopics = await getMatchingTopics(label);
  } catch (err: any) {
    error = err.message;
  }

  return (
    <TopicPage
      slug={params.slug}
      topicLabel={label}
      matchingTopics={matchingTopics}
      error={error}
    />
  );
}
