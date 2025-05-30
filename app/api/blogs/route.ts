import { NextResponse } from "next/server";
import qs from "qs";

export const revalidate = 60;

export async function GET() {
  const API_URL = process.env.API_URL;
  const TOKEN = process.env.TOKEN;

  if (!API_URL || !TOKEN) {
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
          blocks: {
            on: {
              "shared.rich-text": { populate: "*" },
              "shared.slider": { populate: "*" },
            },
          },
        },
      },
      {
        encodeValuesOnly: true, // важно для корректной сериализации
      }
    );

    const res = await fetch(`${API_URL}/articles?${query}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      next: { revalidate: 60 },
    });

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
