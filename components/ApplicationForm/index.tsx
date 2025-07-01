"use client";
import { useState } from "react";
import styles from "./page.module.css";
import PhoneInput from "@/utils/telMask";
import { useRouter } from "next/navigation";
import { Info } from "../Modals/info";

interface ApplicationFormProps {
  form?: string;
  formAdjective?: string;
}

export default function ApplicationForm({
  form,
  formAdjective,
}: ApplicationFormProps) {
  const router = useRouter();
  const [headline, setHeadline] = useState(form || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const utm_source = localStorage.getItem("utm_source");
    const utm_medium = localStorage.getItem("utm_medium");
    const utm_campaign = localStorage.getItem("utm_campaign");
    const utm_campaign_name = localStorage.getItem("utm_campaign_name");
    const utm_content = localStorage.getItem("utm_content");
    const utm_term = localStorage.getItem("utm_term");
    const utm_placement = localStorage.getItem("utm_placement");
    const utm_device = localStorage.getItem("utm_device");
    const utm_region_name = localStorage.getItem("utm_region_name");
    const utm_position = localStorage.getItem("utm_position");
    const utm_position_type = localStorage.getItem("utm_position_type");
    const utm_source_type = localStorage.getItem("utm_source_type");
    const utm_yclid = localStorage.getItem("yclid");

    try {
      const res = await fetch("/api/sendForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          headline,
          name,
          phone,
          utm_source,
          utm_medium,
          utm_campaign,
          utm_campaign_name,
          utm_content,
          utm_term,
          utm_placement,
          utm_device,
          utm_region_name,
          utm_position,
          utm_position_type,
          utm_source_type,
          utm_yclid,
        }),
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
      <p>
        Мы поможем подобрать {formAdjective} {form}
      </p>

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
            loading="lazy"
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
              placeholder="Иван Иванов"
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
            Получить подборку
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
