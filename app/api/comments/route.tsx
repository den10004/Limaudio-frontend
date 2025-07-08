import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, text, id, parentId } = await req.json();
    console.log("Received data:", { name, text, id, parentId });

    if (!name || !text || !id) {
      return NextResponse.json(
        { error: "Missing required fields: name, text, or id" },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/comments/new/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      body: JSON.stringify({
        name,
        text,
        articleID: id,
        parentId: parentId || null,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Strapi error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Failed to post comment" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
