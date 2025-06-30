import { Articles } from "@/types/articles";
import qs from "qs";

// Получение статей по slug категории
export async function getArticlesByCategorySlug(
  categorySlug: string
): Promise<Articles[]> {
  const query = qs.stringify(
    {
      filters: {
        category: {
          slug: { $eq: categorySlug },
        },
      },
      populate: {
        category: { fields: ["name", "slug"] },
        // остальные поля...
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await fetch(`${process.env.API_URL}/articles?${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  const data = await res.json();
  return data?.data ?? [];
}

// Получение всех категорий для построения ссылок
export async function getBlogCategories() {
  const query = qs.stringify(
    {
      fields: ["name", "slug"],
      sort: "name:asc",
    },
    { encodeValuesOnly: true }
  );

  const res = await fetch(`${process.env.API_URL}/categories?${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    next: { revalidate: 3600 }, // Долгий кэш
  });

  const data = await res.json();
  return (
    data?.data?.map((cat: any) => ({
      href: `/blog/category/${cat.attributes.slug}`,
      label: cat.attributes.name,
    })) ?? []
  );
}
