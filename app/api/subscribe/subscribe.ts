import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface SubscribeRequest {
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email }: SubscribeRequest = req.body;

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
      from: `"Limaudio" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: "Подтверждение подписки",
      html: `
        <div>
          <h2>Спасибо за подписку!</h2>
          <p>Вы успешно подписались на рассылку новостей и акций нашего магазина.</p>
          <p>Если это произошло по ошибке, просто проигнорируйте это письмо.</p>
        </div>
      `,
    });

    // Также можно сохранить email в базу данных
    // await saveEmailToDatabase(email);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({ error: "Failed to process subscription" });
  }
}
