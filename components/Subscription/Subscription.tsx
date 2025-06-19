"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function Subscription() {
  const [subscribe, setSubscribe] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Ошибка отправки");

      const resultData = await res.json();
      setResult(
        resultData.success ? "Успешно отправлено!" : "Ошибка отправки."
      );
      setEmail("");
    } catch (err) {
      setResult((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.subscription}>
      <div className="container">
        <div
          className={styles.subscription__block}
          style={{ position: "relative" }}
        >
          <h3 className="text-h3-bold">
            Подпишитесь на рассылку и узнавайте о скидках и акциях
          </h3>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите E-mail"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
            <button
              className={`${styles.send_btn} ${
                loading ? styles.send_btn_disabled : ""
              }`}
              type="submit"
              aria-label="Подписаться"
              disabled={loading}
            >
              <svg
                width="35"
                height="34"
                viewBox="0 0 35 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.375977"
                  y="0.000976562"
                  width="34"
                  height="34"
                  rx="17"
                  fill="#2C2C2C"
                />
                <path
                  d="M24.8002 17.4252C25.0346 17.1909 25.0346 16.811 24.8002 16.5767L20.9819 12.7583C20.7475 12.524 20.3677 12.524 20.1333 12.7583C19.899 12.9927 19.899 13.3725 20.1333 13.6069L23.5274 17.001L20.1333 20.3951C19.899 20.6294 19.899 21.0093 20.1333 21.2436C20.3677 21.4779 20.7475 21.4779 20.9819 21.2436L24.8002 17.4252ZM10.376 17.601H24.376V16.401H10.376V17.601Z"
                  fill="#F8F8F8"
                />
              </svg>
            </button>
          </form>
          {result && <div>Письмо отправлено</div>}

          <div className="text-small">
            <span>
              Нажимая на стрелку "Далее", Вы даете согласие на получение
              рекламной рассылки и обработку &nbsp;
              <Link href="/privacy-policy">персональных данных</Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
