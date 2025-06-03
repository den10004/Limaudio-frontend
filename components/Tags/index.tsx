import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

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
}
export default function Tags({ tags }: TagsProps) {
  if (!tags?.length) {
    return null;
  }

  return (
    <ul className={styles.popular__sort}>
      {tags.map((e: any, i) => (
        <li key={i} className={styles.tag}>
          <Link href="/">
            <Image src={e.image.url} alt={e.title} width={28} height={32} />
            <span>{e.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
