import { NextResponse } from "next/server";
import qs from "qs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryName = searchParams.get("category");

  if (!categoryName) {
    return NextResponse.json(
      { error: "Параметр 'category' обязателен" },
      { status: 400 }
    );
  }

  try {
    const query = qs.stringify(
      {
        populate: {
          cover: { fields: ["url"] },
          category: { fields: ["name"] },
          topics: {
            populate: {
              title: {},
              image: {
                fields: ["url"],
              },
            },
          },
        },
        filters: {
          category: {
            name: {
              $eq: categoryName,
            },
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const strapiUrl = `${process.env.API_URL}/articles?${query}`;
    console.log("Запрос к Strapi:", strapiUrl);

    const res = await fetch(strapiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Strapi Error:", errorText);
      throw new Error(`Strapi вернул ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Ошибка сервера при загрузке данных" },
      { status: 500 }
    );
  }
}
