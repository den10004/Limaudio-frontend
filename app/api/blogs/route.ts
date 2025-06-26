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
    const sortByDate = searchParams.get("sortByDate") || "";
    const categoryName = searchParams.get("category");
    const sortByPopularity = searchParams.get("sortByPopularity") || "";
    const searchQuery = searchParams.get("searchQuery") || "";
    const tags = searchParams.getAll("tags[]");
    const topic = searchParams.get("topic");

    const sortParams: string[] = [];

    if (sortByPopularity === "popular") {
      sortParams.push("views:desc");
    } else if (sortByDate === "asc" || sortByDate === "desc") {
      sortParams.push(`publishedAt:${sortByDate}`);
    } else {
      sortParams.push("publishedAt:asc");
    }

    const filters: any = {};

    if (searchQuery) {
      filters.$or = [
        { title: { $containsi: searchQuery } },
        { description: { $containsi: searchQuery } },
      ];
    }

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

    if (categoryName) {
      filters.$or = filters.$or || [];
      filters.$or.push({
        category: {
          name: {
            $in: [categoryName],
          },
        },
      });
    }

    if (topic) {
      filters.topics = {
        title: {
          $eq: topic,
        },
      };
    }

    // console.log(sortParams);

    const query = qs.stringify(
      {
        filters,
        sort: sortParams,
        populate: {
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

    console.log(query);

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
