// app/api/sendEmail/routes.ts

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  console.log(email);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.timeweb.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "Сообщение с сайта Limaudio",
      text: `Email: ${email}
      Сообщение: "подписка на рассылку"`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка отправки письма" },
      { status: 500 }
    );
  }
}
