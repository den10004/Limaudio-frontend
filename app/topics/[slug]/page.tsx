import { Metadata } from "next";
import { notFound } from "next/navigation";
import { linksTopics } from "@/lib/footerLinks";
import TopicPage from "./TopicPage";

interface Params {
  slug: string;
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

  return {
    title: `${label} - Блог`,
    description: `Читайте статьи на тему ${label}.`,
  };
}

export default function TopicPageWrapper({ params }: { params: Params }) {
  const label = getTopicLabel(params.slug);

  if (!label) {
    notFound();
  }

  return <TopicPage slug={params.slug} topicLabel={label} />;
}
