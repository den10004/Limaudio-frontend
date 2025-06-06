"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

interface Image {
  id: number;
  documentId: string;
  url: string;
}

interface DataItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title?: string;
  image?: Image;
}

interface TagsProps {
  tags: DataItem[];
  onTagClick?: (tagTitle: string | null) => void;
}

export default function Tags({ tags, onTagClick }: TagsProps) {
  if (!tags?.length) {
    return null;
  }

  return (
    <ul className={styles.popular__sort}>
      {tags.map((e) => (
        <li key={e.id} className={styles.tag}>
          <Link
            href="/"
            onClick={(event) => {
              event.preventDefault(); // Prevent navigation to avoid multiple triggers
              if (onTagClick) {
                onTagClick(e.title ?? null);
              }
            }}
          >
            <Image
              src={
                e.image?.url ||
                "https://37490647-limaudio.s3.twcstorage.ru/platforma_20783e4ce2.jpg"
              }
              alt={e.title ?? "Без названия"}
              width={28}
              height={32}
            />
            <span>{e.title ?? "Без названия"}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
