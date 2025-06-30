import { NextResponse } from "next/server";
import qs from "qs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (!process.env.API_URL || !process.env.TOKEN) {
    return NextResponse.json(
      { error: "Missing API_URL or TOKEN in environment variables" },
      { status: 500 }
    );
  }

  try {
    const query = qs.stringify(
      {
        populate: "*",
        publicationState: "live",
        filters: category
          ? {
              category: {
                name: {
                  $containsi: category,
                },
              },
            }
          : undefined,
      },
      { encodeValuesOnly: true }
    );

    const res = await fetch(`${process.env.API_URL}/articles?${query}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
