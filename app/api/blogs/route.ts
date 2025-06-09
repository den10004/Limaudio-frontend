import { NextRequest, NextResponse } from "next/server";
import qs from "qs";
/*
export async function GET() {
  if (!process.env.API_URL || !process.env.TOKEN) {
    console.error("API_URL или TOKEN не заданы в .env");
    return NextResponse.json(
      { error: "Неверная конфигурация сервера" },
      { status: 500 }
    );
  }

  try {
    const query = qs.stringify(
      {
        populate: {
          cover: {
            fields: "url",
          },
          /*
          blocks: {
            on: {
              "shared.rich-text": { populate: "*" },
              "shared.slider": { populate: "*" },
            },
          },*/ /*
          category: { fields: "name" },
          comments: { count: true },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const res = await fetch(`${process.env.API_URL}/articles?${query}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      next: { revalidate: 60 },
    });
    console.log(res);
    if (!res.ok) {
      const text = await res.text();
      console.error(`Ошибка от Strapi API: ${res.status} - ${text}`);
      throw new Error(`Strapi API error: ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Ошибка при получении данных из Strapi:", error);
    return NextResponse.json(
      { error: "Ошибка при получении данных" },
      { status: 500 }
    );
  }
}
*/

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

    const sortByDate = searchParams.get("sortByDate") || "asc";
    const sortByPopularity =
      searchParams.get("sortByPopularity") || "not_popular";
    const searchQuery = searchParams.get("searchQuery") || "";
    const tags = searchParams.getAll("tags[]");

    const sortParams: string[] = [];

    if (sortByPopularity === "popular") {
      sortParams.push("views:desc");
    }

    if (sortByDate) {
      sortParams.push(`publishedAt:${sortByDate}`);
    }

    const filters: any = {};

    if (searchQuery) {
      filters.$or = [
        { title: { $containsi: searchQuery } },
        { content: { $containsi: searchQuery } },
      ];
    }

    if (tags.length > 0) {
      filters.topics = {
        title: {
          $in: tags,
        },
      };
    }
    filters.category = {
      name: {
        $in: tags,
      },
    };

    const query = qs.stringify(
      {
        sort: sortParams,
        filters,
        populate: {
          cover: { fields: ["url"] },
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
      console.error(`Ошибка от Strapi API: ${res.status} - ${text}`);
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = await res.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Ошибка при получении данных из Strapi:", error);
    return NextResponse.json(
      { error: "Ошибка при получении данных" },
      { status: 500 }
    );
  }
}
