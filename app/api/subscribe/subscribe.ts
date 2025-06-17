import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface SubscribeRequest {
  email: string;
}

interface ApiResponse {
  success?: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Устанавливаем заголовок Content-Type
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email }: SubscribeRequest = req.body;

  // Валидация email на сервере
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Некорректный email адрес" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Название вашего магазина" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: "Подтверждение подписки",
      html: `...`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Subscription error:", error);
    return res
      .status(500)
      .json({ error: "Ошибка сервера при обработке подписки" });
  }
}
