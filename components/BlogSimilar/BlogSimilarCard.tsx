import Link from "next/link";
import styles from "./page.module.css";
import { Card } from "@/types/card";

type CardItemProps = {
  card: Card;
  type?: "big" | "small";
};

export default function BlogSimilarCard({ card }: CardItemProps) {
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^а-яёa-z0-9\s-]/g, "")
      .replace(/[\s-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  const slug = createSlug(card.title);

  return (
    <Link href={`/blog/${slug}`} scroll={false}>
      <article className={styles.similarArticle}>
        <div
          className={styles.similarArticle__img}
          style={{ position: "relative" }}
        >
          <img src={card.cover?.url} alt={card.title} loading="lazy" />
          <div className="labelblock-min">
            <div className="label article-label">{card.type}</div>
          </div>
        </div>

        <h3 className="text" style={{ fontWeight: 500 }}>
          {card.title}
        </h3>
        <div className={`text-small ${styles.similarArticle__span}`}>
          <div>
            <span>11/04/2025</span>
          </div>
          <div>
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1584 1C5.55232 1 2.43729 5.36002 1.3303 7.29803C1.10272 7.69552 0.989446 7.89529 1.00077 8.19186C1.01416 8.48843 1.14803 8.68203 1.41474 9.06922C2.73283 10.9825 6.31229 15.4167 11.1584 15.4167C16.0044 15.4167 19.5839 10.9825 20.902 9.06922C21.1697 8.68203 21.3036 8.48843 21.3149 8.19186C21.3262 7.89529 21.214 7.69552 20.9864 7.29803C19.8804 5.36002 16.7644 1 11.1584 1Z"
                stroke="#0055CC"
              ></path>
              <path
                d="M11.1586 11.2976C12.8648 11.2976 14.2479 9.9145 14.2479 8.20834C14.2479 6.50217 12.8648 5.11905 11.1586 5.11905C9.45246 5.11905 8.06934 6.50217 8.06934 8.20834C8.06934 9.9145 9.45246 11.2976 11.1586 11.2976Z"
                stroke="#0055CC"
              ></path>
            </svg>
            <span>120</span>
          </div>
          <div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.291998 9.08801C0.291998 7.36566 0.802733 5.68199 1.75962 4.24992C2.7165 2.81784 4.07656 1.70167 5.6678 1.04256C7.25904 0.383442 9.00999 0.210988 10.6992 0.547001C12.3885 0.883014 13.9402 1.7124 15.1581 2.93028C16.3759 4.14817 17.2053 5.69984 17.5413 7.3891C17.8773 9.07835 17.7049 10.8293 17.0458 12.4205C16.3867 14.0118 15.2705 15.3718 13.8384 16.3287C12.4063 17.2856 10.7227 17.7963 9.00033 17.7963H0.979498C0.843611 17.7962 0.710808 17.7558 0.59786 17.6803C0.484912 17.6047 0.396887 17.4974 0.344902 17.3719C0.292916 17.2463 0.279302 17.1082 0.30578 16.9749C0.332257 16.8416 0.397638 16.7192 0.493665 16.623L2.37558 14.7402C1.02865 13.1652 0.289594 11.1604 0.291998 9.08801ZM9.00033 1.75467C7.5499 1.75462 6.13202 2.18468 4.92601 2.99048C3.72 3.79627 2.78003 4.9416 2.22496 6.28163C1.6699 7.62165 1.52467 9.09618 1.80765 10.5187C2.09063 11.9413 2.78911 13.248 3.81475 14.2736C3.94349 14.4025 4.01581 14.5772 4.01581 14.7594C4.01581 14.9416 3.94349 15.1164 3.81475 15.2453L2.63958 16.4213H9.00033C10.9453 16.4213 12.8105 15.6487 14.1858 14.2735C15.561 12.8982 16.3337 11.0329 16.3337 9.08801C16.3337 7.14309 15.561 5.27782 14.1858 3.90256C12.8105 2.52729 10.9453 1.75467 9.00033 1.75467Z"
                fill="#0055CC"
              ></path>
            </svg>
            <span>20</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
