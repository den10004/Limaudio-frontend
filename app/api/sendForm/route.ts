import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { headline, email, name, phone, comment, ...utmParams } =
    await req.json();

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
Email:   ${email}`;
    }

    if (comment) {
      emailText += `
Сообщение: ${comment}`;
    }

    // Добавляем UTM-метки в письмо, если они есть
    if (Object.keys(utmParams).length > 0) {
      emailText += `\n\nUTM-метки:`;
      for (const [key, value] of Object.entries(utmParams)) {
        if (value) {
          emailText += `\n${key}: ${value}`;
        }
      }
    }

    const mailOptions = {
      from: `"Limaudio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Заявка с сайта Limaudio: ${headline}`,
      text: emailText.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">${headline}</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
          ${comment ? `<p><strong>Сообщение:</strong> ${comment}</p>` : ""}
          
          ${
            Object.keys(utmParams).length > 0
              ? `
            <div style="margin-top: 20px; background: #f5f5f5; padding: 10px; border-radius: 5px;">
              <h3 style="margin-top: 0; color: #555;">UTM-метки</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${Object.entries(utmParams)
                  .map(([key, value]) =>
                    value ? `<li><strong>${key}:</strong> ${value}</li>` : ""
                  )
                  .join("")}
              </ul>
            </div>
          `
              : ""
          }
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
