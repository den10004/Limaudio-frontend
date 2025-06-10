// app/api/category/route.ts
import { NextResponse } from "next/server";
import qs from "qs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  // Логирование для дебага
  console.log("Запрос к /api/category. Категория:", category);

  try {
    const query = qs.stringify(
      {
        populate: "*",
        filters: {
          category: {
            name: {
              $eq: category,
            },
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const strapiUrl = `${process.env.API_URL}/api/articles?${query}`;
    console.log("Запрос к Strapi:", strapiUrl);

    const res = await fetch(strapiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка Strapi:", errorText);
      throw new Error(`Strapi вернул ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Ошибка в API-маршруте:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Неизвестная ошибка" },
      { status: 500 }
    );
  }
}
