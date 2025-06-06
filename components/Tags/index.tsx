"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TagImage {
  id: number;
  documentId: string;
  url: string;
}

interface TagItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  image: TagImage;
}

interface TagsProps {
  tags: TagItem[];
  onTagClick: (tagTitle: string | null) => void;
}

export default function Tags({ tags, onTagClick }: TagsProps) {
  const [click, setClick] = useState<string | null>(null);

  useEffect(() => {
    onTagClick(click);
  }, [click, onTagClick]);

  if (!tags?.length) {
    return null;
  }

  return (
    <ul className={styles.popular__sort}>
      {tags.map((e: any, i) => (
        <li key={i} className={styles.tag}>
          <Link href="/" onClick={() => setClick(e.title)}>
            <Image
              src={
                e.image?.url ||
                "https://37490647-limaudio.s3.twcstorage.ru/platforma_20783e4ce2.jpg"
              }
              alt={e.title}
              width={28}
              height={32}
            />
            <span>{e.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
