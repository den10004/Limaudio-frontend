import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { headline, email, name, phone, comment } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      requireTLS: true,
      tls: {
        ciphers: "SSLv3",
      },
    });

    let emailText = `
Форма:   ${headline}
Имя:     ${name}
Телефон: ${phone}
    `.trim();

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
      subject: "Заявка с сайта Limaudio",
      text: emailText.trim(),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
