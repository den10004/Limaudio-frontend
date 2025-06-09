import { NextResponse } from "next/server";
import qs from "qs";
/*
export const dynamic = "force-dynamic"; // Important for debugging

export async function GET(request: Request) {
  console.log("API Route Hit!");

  if (!process.env.API_URL || !process.env.TOKEN) {
    console.error("Missing environment variables");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    console.log("Received params:", Object.fromEntries(searchParams.entries()));

    const fetchParams = Object.fromEntries(searchParams.entries());
    const query = qs.stringify(
      {
        ...fetchParams,
        populate: {
          cover: { fields: "url" },
          category: { fields: "name" },
          comments: { count: true },
        },
      },
      { encodeValuesOnly: true }
    );

    const apiUrl = `${process.env.API_URL}/articles?${query}`;
    console.log("Calling Strapi at:", apiUrl);

    const res = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Strapi API Error: ${res.status} - ${text}`);
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Full error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
*/
