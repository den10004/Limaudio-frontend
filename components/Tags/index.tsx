"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { Key, useState } from "react";

interface Image {
  id: number;
  documentId: string;
  url: string;
}

interface uniqueTags {
  createdAt: string;
  documentId: string;
  id: number;
  image: {
    documentId: string;
    id: string;
    url: string;
  };
  title: string;
  publishedAt: string;
  updatedAt: string;
}

interface TagsProps {
  uniqueTags: any;
  onTagClick?: (selectedTags: (string | null)[]) => void;
  filter?: boolean;
}

export default function Tags({
  uniqueTags = [],
  onTagClick,
  filter,
}: TagsProps) {
  const [selectedTags, setSelectedTags] = useState<(string | null)[]>([]);
  if (!uniqueTags) {
    return null;
  }
  const handleTagClick = (tagTitle: string | null) => {
    let updatedTags: (string | null)[];
    if (selectedTags.includes(tagTitle)) {
      updatedTags = selectedTags.filter((title) => title !== tagTitle);
    } else {
      updatedTags = [...selectedTags, tagTitle];
    }
    setSelectedTags(updatedTags);
    if (onTagClick) {
      onTagClick(updatedTags);
    }
  };

  return (
    <ul className={styles.popular__sort}>
      {uniqueTags.map(
        (e: {
          id: Key | null | undefined;
          title: any;
          image: { url: any };
        }) => (
          <li
            key={e.id}
            className={`${styles.tag} ${
              filter
                ? ""
                : selectedTags.includes(e.title ?? null ?? null)
                ? styles.selected
                : ""
            }`}
          >
            <Link
              style={{
                cursor: filter ? "default" : "pointer",
              }}
              href="/"
              onClick={(event) => {
                event.preventDefault();
                handleTagClick(e.title ?? null);
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
        )
      )}
    </ul>
  );
}
