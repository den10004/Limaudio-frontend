import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    const res = await fetch(`${process.env.API_URL}/subscribers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          Email: email,
        },
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при отправке email" },
      { status: 500 }
    );
  }
}
