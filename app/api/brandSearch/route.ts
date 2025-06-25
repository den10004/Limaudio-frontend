import { NextResponse } from "next/server";
import qs from "qs";

export async function GET(request: Request) {
  if (!process.env.API_URL || !process.env.TOKEN) {
    console.error("API_URL или TOKEN не заданы в .env");
    return NextResponse.json(
      { error: "Неверная конфигурация сервера" },
      { status: 500 }
    );
  }

  const allData = [];
  let page = 1;
  const pageSize = 100;

  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search") || "";
    const startsWith = searchParams.get("startsWith") || "";

    while (true) {
      const query = qs.stringify(
        {
          filters: {
            title: startsWith
              ? { $startsWithi: startsWith }
              : { $containsi: searchQuery },
          },
          populate: {
            logo: {
              fields: ["name"],
            },
          },
          pagination: {
            pageSize,
            page,
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      const res = await fetch(`${process.env.API_URL}/brends?${query}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`Ошибка API: ${res.status} - ${text}`);
        throw new Error(`API error: ${res.status}`);
      }

      const json = await res.json();
      const items = json?.data || [];

      allData.push(...items);

      const pagination = json?.meta?.pagination;
      if (!pagination || page >= pagination.pageCount) break;

      page++;
    }

    return NextResponse.json({ data: allData });
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return NextResponse.json(
      { error: "Ошибка при получении данных" },
      { status: 500 }
    );
  }
}
