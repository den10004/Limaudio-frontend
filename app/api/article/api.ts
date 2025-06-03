import { Articles } from "@/types/articles";
import qs from "qs";

if (!process.env.API_URL || !process.env.TOKEN) {
  throw new Error("Missing API_URL or TOKEN in environment variables");
}

export async function getArticleBySlug(slug: string): Promise<Articles | null> {
  const query = qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: {
        cover: { fields: ["url"] },
        blocks: {
          populate: "*",
          on: {
            "shared.rich-text": { populate: "*" },
            "shared.slider": { populate: "*" },
          },
        },
        category: { fields: ["name"] },
        comments: { count: true },
        topics: {
          populate: {
            title: {},
            image: {
              fields: ["url"],
            },
          },
        },
      },
      publicationState: "live",
    },
    { encodeValuesOnly: true }
  );

  const res = await fetch(`${process.env.API_URL}/articles?${query}`, {
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
  const article = data?.data?.[0] ?? null;
  /*
  if (article?.id) {
    try {
      await fetch(
        `${process.env.API_URL}/articles/${article.id}/increment-views`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error incrementing view:", error);
    }
  }
*/
  return article;
  // return data?.data?.[0] ?? null;
}
