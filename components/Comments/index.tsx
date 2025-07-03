"use client";
import { FormatDate } from "@/utils/formatDate";
import styles from "./page.module.css";
import { useState } from "react";
import { Info } from "../Modals/info";

interface Comment {
  createdAt: string;
  documentId: string;
  id: number;
  name: string;
  publishedAt: string;
  reply: string | null;
  text: string;
  updatedAt: string;
}

interface CommentsProps {
  comments: Comment[];
  commentsLength: number;
  id: string;
}

export default function Comments({
  comments,
  commentsLength,
  id,
}: CommentsProps) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          text,
          id,
        }),
      });

      const data = await res.json();
      console.log("API response:", data); // Debug

      if (!res.ok) {
        setError(data.error?.message || "Ошибка при отправке комментария");
      } else {
        setSuccess(true);
        setName("");
        setText("");
        comments.push(data.data);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.comments}>
      <h3 className="text-h3-bold">Комментарии ({commentsLength})</h3>
      <div className={styles.comments__cards}>
        {comments?.map((comment) =>
          comment?.id ? (
            <article key={comment?.id} className={styles.comments__card}>
              <time className="text-small" dateTime="16-04-2025">
                {FormatDate(comment?.createdAt)}
              </time>
              <h3>{comment?.name}</h3>
              <div>
                <p className="text">{comment?.text}</p>
              </div>
            </article>
          ) : null
        )}
      </div>

      <div className={styles.comments__cards}>
        <div
          className={`${styles.comments__send} ${styles.comments__card}`}
          id="reply"
        >
          <h3 className="text-h3-bold">Оставить комментарий</h3>
          <form className={styles.comments__send__form} onSubmit={handleSubmit}>
            <div className={styles.comments__send__form_group}>
              <label className="text-small" htmlFor="name">
                Введите имя*
              </label>
              <input
                type="text"
                className="inputform"
                id="name"
                minLength={3}
                name="name"
                required
                placeholder="Гость"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.comments__send__form_group}>
              <label className="text-small" htmlFor="comment-area">
                Комментарий*
              </label>
              <textarea
                className="inputform"
                id="comments"
                name="comment-area"
                required
                placeholder="Введите ваш комментарий"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Комментарий отправлен</p>}
            {!error && success && (
              <Info
                res={error ? "Ошибка" : "Комментарий отправлен"}
                colors={error ? "red" : "black"}
              />
            )}

            <button
              type="submit"
              className="blogbtnblue standart-btn text-h3"
              disabled={loading}
            >
              {loading ? "Отправка..." : "Отправить"}
              <svg
                width="26"
                height="25"
                viewBox="0 0 26 25"
                className="send-img"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.06072 0.31243C1.02893 -0.180428 -0.10464 0.76243 0.190003 1.86707L2.35 9.93814C2.40414 10.141 2.51667 10.3235 2.67363 10.4629C2.83058 10.6023 3.02505 10.6926 3.23286 10.7224L13.8229 12.2353C14.1293 12.2781 14.1293 12.7217 13.8229 12.7656L3.23393 14.2774C3.02612 14.3073 2.83166 14.3975 2.6747 14.537C2.51774 14.6764 2.40521 14.8589 2.35107 15.0617L0.190003 23.1371C-0.10464 24.2406 1.02893 25.1835 2.06072 24.6917L25.0943 13.7106C26.1111 13.2264 26.1111 11.7778 25.0943 11.2924L2.06072 0.31243Z"
                  fill="white"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
