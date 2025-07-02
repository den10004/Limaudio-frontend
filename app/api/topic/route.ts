import { NextResponse } from "next/server";
import qs from "qs";

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
      const text = await res.text();
      console.error(`Ошибка от Strapi API: ${res.status} - ${text}`);
      throw new Error(`Strapi API error: ${res.status}`);
    }
    const topic = await res.json();
    return NextResponse.json(topic);
  } catch (error) {
    console.error("Ошибка при получении данных из Strapi:", error);
    return NextResponse.json(
      { error: "Ошибка при получении данных" },
      { status: 500 }
    );
  }
}
