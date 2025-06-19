/*import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { hedline, email, name, phone, comment } = await req.json();

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
      text: `
        Тема: ${hedline}
        Имя: ${name} 
        Телефон: ${phone}
        Email:  ${email || ""}
        Сообщение: ${comment || ""}`,
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
}*/

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { hedline, email, name, phone, comment } = await req.json();

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

    let emailText = `
        Тема: ${hedline}
        Имя: ${name} 
        Телефон: ${phone}
        Сообщение: ${comment || ""}`;

    if (email) {
      emailText = `
        Тема: ${hedline}
        Имя: ${name} 
        Телефон: ${phone}
        Email: ${email}
        Сообщение: ${comment || ""}`;
    }

    const mailOptions = {
      from: `"" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "Сообщение с сайта Limaudio",
      text: emailText,
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