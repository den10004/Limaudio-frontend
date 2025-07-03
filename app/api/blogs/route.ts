import { NextRequest, NextResponse } from "next/server";
import qs from "qs";

export async function GET(req: NextRequest) {
  if (!process.env.API_URL || !process.env.TOKEN) {
    console.error("API_URL или TOKEN не заданы в .env");
    return NextResponse.json(
      { error: "Неверная конфигурация сервера" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const sortByDate = searchParams.get("sortByDate");
    const sortByPopularity = searchParams.get("sortByPopularity");
    const searchQuery = searchParams.get("searchQuery") || "";
    const tags = searchParams.getAll("tags[]");
    const topic = searchParams.get("topic");
    const category = searchParams.get("category");

    const sortParams: string[] = [];

    // Сортировка по дате
    if (sortByDate === "asc" || sortByDate === "desc") {
      sortParams.push(`createdAt:${sortByDate}`);
    }

    // Сортировка по популярности
    if (sortByPopularity === "popular" || sortByPopularity === "not_popular") {
      sortParams.push(
        `views:${sortByPopularity === "popular" ? "desc" : "asc"}`
      );
    }

    // Сортировка по умолчанию
    if (sortParams.length === 0) {
      sortParams.push("createdAt:desc");
    }

    const filters: any = {};

    // Поиск по заголовку или описанию
    if (searchQuery) {
      filters.$or = [
        { title: { $containsi: searchQuery } },
        { description: { $containsi: searchQuery } },
        { seo: { metaKeys: { $containsi: searchQuery } } },
      ];
    }

    if (category) {
      filters.category = {
        name: {
          $eq: category,
        },
      };
    }

    // Фильтрация по тегам
    if (tags.length > 0) {
      filters.$or = filters.$or || [];
      filters.$or.push(
        {
          topics: {
            title: {
              $in: tags,
            },
          },
        },
        {
          category: {
            name: {
              $in: tags,
            },
          },
        }
      );
    }

    // Фильтрация по topic
    if (topic) {
      filters.topics = {
        title: {
          $eq: topic,
        },
      };
    }

    // Фильтрация по category
    if (category) {
      filters.category = {
        name: {
          $eq: category, // Точное совпадение с категорией
        },
      };
    }

    const query = qs.stringify(
      {
        sort: sortParams,
        filters,
        populate: {
          seo: { populate: "*" },
          cover: { fields: ["url"] },
          category: { fields: ["name"] },
          comments: { count: true },
          topics: {
            populate: {
              title: {},
              formCategory: {},
              formAdjective: {},
              image: {
                fields: ["url"],
              },
            },
          },
        },
        pagination: {
          pageSize: 500,
          page: 1,
        },
      },
      { encodeValuesOnly: true }
    );

    const res = await fetch(`${process.env.API_URL}/articles?${query}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Ошибка API: ${res.status} - ${text}`);
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Ошибка при получении данных:", error);
    return NextResponse.json(
      { error: "Ошибка при получении данных" },
      { status: 500 }
    );
  }
}
