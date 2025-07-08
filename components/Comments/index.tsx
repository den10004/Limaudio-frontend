"use client";
import { FormatDate } from "@/utils/formatDate";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Info } from "../Modals/info";

interface Comment {
  replies: Comment[];
  createdAt: string;
  documentId: string;
  id: number;
  name: string;
  publishedAt: string | null;
  reply: string | null;
  text: string;
  updatedAt: string;
  createdBy?: { id: number; username: string } | null;
  creatorName?: string;
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
  const [loadingReply, setLoadingReply] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [replyingTo, setReplyingTo] = useState<{
    id: number;
    name: string;
    documentId: string;
  } | null>(null);
  const [replyText, setReplyText] = useState("");
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const payload = {
        name,
        text,
        id,
        ...(replyingTo ? { parentId: replyingTo.documentId } : {}),
      };

      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error?.message || "Ошибка при отправке комментария");
      } else {
        setSuccess(true);
        setName("");
        setText("");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (
    e: React.FormEvent,
    commentId: number,
    commentName: string,
    documentId: string
  ) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setLoadingReply(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || "Гость",
          text: replyText,
          id,
          parentId: documentId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error?.message || "Ошибка при отправке ответа");
      } else {
        setSuccess(true);
        setReplyText("");
        setReplyingTo(null);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Ошибка сервера");
    } finally {
      setLoadingReply(false);
    }
  };

  const startReply = (
    commentId: number,
    commentName: string,
    documentId: string
  ) => {
    setReplyingTo({ id: commentId, name: commentName, documentId });
    setReplyText(`@${commentName}, `);
    document.getElementById("reply")?.scrollIntoView({ behavior: "smooth" });
  };
  const topLevelComments = localComments.filter(
    (comment) => comment.reply === null
  );

  return (
    <div className={styles.comments}>
      <h3 className="text-h3-bold">
        {commentsLength === 0
          ? "Комментариев нет"
          : `Комментарии (${commentsLength})`}
      </h3>
      <div className={styles.comments__cards}>
        {topLevelComments.map((comment) =>
          comment?.id ? (
            <article key={comment?.id} className={styles.comments__card}>
              <time className="text-small" dateTime="16-04-2025">
                {FormatDate(comment?.createdAt)}
              </time>
              <h3>{comment?.creatorName || comment?.name}</h3>
              <div>
                <p className="text">{comment?.text}</p>
              </div>
              <div className={styles.comments__btn}>
                <button
                  className={`${styles.comment_reply} text16`}
                  onClick={() =>
                    startReply(comment.id, comment.name, comment.documentId)
                  }
                >
                  Ответить на комментарий
                </button>
              </div>
              {comment?.replies?.map((reply) => (
                <div
                  key={reply.id}
                  style={{
                    margin: "20px 0 0 30px",
                    paddingTop: "10px",
                    borderTop: "1px solid #a0a0a0",
                  }}
                >
                  <time className="text-small" dateTime="16-04-2025">
                    {FormatDate(reply?.createdAt)}
                  </time>
                  <p className="text">{reply?.text}</p>
                </div>
              ))}
              {replyingTo?.id === comment.id && (
                <form
                  className={styles.reply_form}
                  onSubmit={(e) =>
                    handleReply(e, comment.id, comment.name, comment.documentId)
                  }
                >
                  <div className={styles.comments__send__form_group}>
                    <label
                      className="text-small"
                      htmlFor={`reply-${comment.id}`}
                    >
                      Ваш ответ
                    </label>
                    <textarea
                      className="inputform"
                      id={`reply-${comment.id}`}
                      required
                      placeholder="Введите ваш ответ"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                  </div>
                  <div className={styles.comments__actions}>
                    <button
                      type="button"
                      className="blogbtn standart-btn text-h3"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText("");
                      }}
                    >
                      Отменить
                    </button>
                    <button
                      type="submit"
                      className="blogbtnblue standart-btn text-h3"
                      disabled={loadingReply || !replyText.trim()}
                    >
                      {loadingReply ? "Отправка..." : "Отправить ответ"}
                    </button>
                  </div>
                </form>
              )}
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
                res={error ? "Ошибка" : "Комментарий отправлен на проверку"}
                colors={error ? "red" : "black"}
              />
            )}

            <button
              type="submit"
              className="blogbtnblue standart-btn text-h3"
              disabled={loading || !text.trim() || !name.trim()}
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
