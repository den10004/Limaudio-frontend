import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import Image from "next/image";

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
  tags: TagItem[];
}
export default function Tags({ tags }: TagsProps) {
  if (!tags?.length) {
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
      {tags.map((e: any, i) => (
        <li key={i} className={styles.tag}>
          <Link href="/">
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
