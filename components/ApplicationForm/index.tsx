"use client";
import { useState } from "react";
import styles from "./page.module.css";
import PhoneInput from "@/utils/telMask";
import { useRouter } from "next/navigation";
import { Info } from "../Modals/info";

export default function ApplicationForm({ title }: { title: string }) {
  const router = useRouter();
  const [headline, setHeadline] = useState(title);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/sendForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ headline, name, phone }),
      });

      if (res.ok) {
        router.push(`/thanks?name=${encodeURIComponent(name)}`);
      }
      if (!res.ok) throw new Error("Ошибка отправки");

      const resultData = await res.json();
      setResult(
        resultData.success ? "Успешно отправлено!" : "Ошибка отправки."
      );

      setPhone("");
      setName("");
      setError(false);
    } catch (err) {
      setResult((err as Error).message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.application}>
      <h2 className="text-h2">Оставьте заявку</h2>
      <p>Мы поможем подобрать лучшую напольную акустику</p>

      <div className={styles.application__form}>
        <div style={{ position: "relative" }}>
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: "blur(50px)",
              color: " #0055cc",
              position: "absolute",
            }}
          >
            <path
              fill="currentColor"
              d="M35.2,-59.8C49.2,-52.9,66.6,-50.7,71.5,-41.5C76.3,-32.4,68.6,-16.2,65,-2.1C61.3,12,61.7,23.9,59,36.7C56.2,49.5,50.3,63.2,39.9,69.8C29.6,76.3,14.8,75.8,2.9,70.8C-9,65.8,-18,56.2,-25.5,48C-33.1,39.9,-39.2,33,-48.6,25.2C-58,17.4,-70.7,8.7,-71.6,-0.5C-72.5,-9.7,-61.6,-19.5,-52.9,-28.7C-44.3,-37.8,-38,-46.4,-29.6,-56.5C-21.2,-66.7,-10.6,-78.4,0,-78.4C10.6,-78.4,21.2,-66.7,35.2,-59.8Z"
              transform="translate(100 100)"
            ></path>
          </svg>

          <img
            className={styles.application__img}
            src="/manager.webp"
            alt="менеджер"
          />
          <div className={styles.form__expert}>
            <h3 className="text" style={{ fontWeight: "600" }}>
              Айрат Насыбуллин
            </h3>
            <p className="text-small">руководитель отдела Hi-END AV</p>
          </div>
        </div>
        <form className={styles.application__sendform} onSubmit={handleSubmit}>
          <div className={styles.application__form_group}>
            <input
              hidden
              type="text"
              name="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
            <label className="text-small" htmlFor="name">
              Введите имя*
            </label>
            <input
              className="inputform"
              type="text"
              id="name"
              minLength={3}
              onChange={(e) => setName(e.target.value)}
              value={name}
              name="name"
              required
              placeholder="Гость"
            />
          </div>

          <div className={styles.application__form_group}>
            <label className="text-small" htmlFor="phone">
              Введите номер телефона*
            </label>
            <PhoneInput
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="inputform"
            />
          </div>

          <button
            type="submit"
            className="blogbtnblue standart-btn text-h3"
            disabled={loading}
          >
            Подобрать акустику
          </button>
        </form>
        {!error && result && (
          <Info
            res={error ? "Ошибка" : "Письмо отправлено"}
            colors={error ? "red" : "black"}
          />
        )}
      </div>
    </div>
  );
}
