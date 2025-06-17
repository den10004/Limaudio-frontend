"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import MarkdownBrand from "./MarkdownBrand";

type Brand = {
  name: string;
  src: string;
  alt: string;
  slug: string;
};

interface BrandTextProps {
  brand: Brand;
}

export default function BrandText({ content }: any) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className={styles.brand_desc}>
      <div className="container">
        <div className={styles.brand_desc__block}>
          <div className={styles.brand_desc__img}>
            <Image
              src={content?.logo.url}
              alt={content?.title}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className={styles.brand_desc__content}>
            <h3 className="text-h2">{content?.title}</h3>
            <h4 className="text">
              {content?.country ? `${content?.country}` : ""}
              {content?.country && content?.year ? `, ` : ""}
              <span style={{ whiteSpace: "nowrap" }}>
                {content?.year ? `год основания - ${content?.year}` : ""}
              </span>
            </h4>
          </div>

          <div
            className={styles.brand_desc__text}
            style={{ position: "relative" }}
          >
            <MarkdownBrand content={content} expanded={expanded} />

            <button
              onClick={() => setExpanded(!expanded)}
              className={`${styles.toggle_btn} ${styles.text_small}`}
            >
              {expanded ? "Скрыть" : "Показать"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
