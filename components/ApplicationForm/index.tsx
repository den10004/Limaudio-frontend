"use client";
import { useState } from "react";
import styles from "./page.module.css";
import PhoneInput from "@/utils/telMask";
import { useRouter } from "next/navigation";
import { Info } from "../Modals/info";

export default function ApplicationForm({ title }: { title: string }) {
  const router = useRouter();
  const [hedline, setHeadline] = useState(title);
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
        body: JSON.stringify({ hedline, name, phone }),
      });
      router.push(`/thanks?name=${encodeURIComponent(name)}`);
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
      <p>Мы поможем подобрать лучшую напольную акустику для ваших задач</p>

      <div className={styles.application__form}>
        <div style={{ position: "relative" }}>
          <img src="/manager.webp" alt="менеджер" />
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
              value={hedline}
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
