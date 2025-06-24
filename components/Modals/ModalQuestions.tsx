"use client";

import PhoneInput from "@/utils/telMask";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Info } from "./info";

interface ModalHeaderProps {
  onClose: () => void;
}

export const ModalQuestions: React.FC<ModalHeaderProps> = ({ onClose }) => {
  const router = useRouter();
  const [hedline, setHeadline] = useState("Заказать звонок");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ hedline, name, phone, email }),
      });

      if (res.ok) {
        router.push(`/thanks?name=${encodeURIComponent(name)}`);
        onClose();
      }

      if (!res.ok) throw new Error("Ошибка отправки");

      const resultData = await res.json();
      setResult(
        resultData.success ? "Успешно отправлено!" : "Ошибка отправки."
      );

      setPhone("");
      setName("");
      setEmail("");
      setError(false);
    } catch (err) {
      setResult((err as Error).message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="callback" className="modal">
      <div className="modal-content modal-position">
        <span className="close-btn" onClick={onClose}>
          ×
        </span>
        <h3 className="text-h3-bold">Заказать обратный звонок</h3>
        <form className="callbackform" onSubmit={handleSubmit}>
          <div className="comments__send__form-group">
            <label className="text-small" htmlFor="name">
              Введите имя*
            </label>
            <input
              hidden
              type="text"
              name="headline"
              value={hedline}
              onChange={(e) => setHeadline(e.target.value)}
            />
            <input
              type="text"
              className="inputform"
              id="name"
              minLength={3}
              onChange={(e) => setName(e.target.value)}
              value={name}
              name="name"
              required={true}
              placeholder="Гость"
            />
          </div>
          <div className="comments__send__form-group">
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
            className="blogbtnblue text20"
            disabled={loading}
            style={{ width: "auto", height: "50px" }}
          >
            Заказать
            <svg
              style={{ marginLeft: "10px" }}
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.06072 0.31243C1.02893 -0.180428 -0.10464 0.76243 0.190003 1.86707L2.35 9.93814C2.40414 10.141 2.51667 10.3235 2.67363 10.4629C2.83058 10.6023 3.02505 10.6926 3.23286 10.7224L13.8229 12.2353C14.1293 12.2781 14.1293 12.7217 13.8229 12.7656L3.23393 14.2774C3.02612 14.3073 2.83166 14.3975 2.6747 14.537C2.51774 14.6764 2.40521 14.8589 2.35107 15.0617L0.190003 23.1371C-0.10464 24.2406 1.02893 25.1835 2.06072 24.6917L25.0943 13.7106C26.1111 13.2264 26.1111 11.7778 25.0943 11.2924L2.06072 0.31243Z"
                fill="white"
              ></path>
            </svg>
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
};
