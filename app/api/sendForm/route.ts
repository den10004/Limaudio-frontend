import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/*
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
Телефон: ${phone}`;

    if (email) {
      emailText += `
Email: ${email}`;
    }

    if (comment) {
      emailText += `
Сообщение: ${comment}`;
    }

    const mailOptions = {
      from: `"" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "Сообщение с сайта Limaudio",
      text: emailText.trim(),
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
*/

export async function POST(req: NextRequest) {
  const { hedline, email, name, phone, comment } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
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
Телефон: ${phone}`;

    if (email) {
      emailText += `
Email: ${email}`;
    }

    if (comment) {
      emailText += `
Сообщение: ${comment}`;
    }

    const mailOptions = {
      from: `"" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "Сообщение с сайта Limaudio",
      text: emailText.trim(),
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
