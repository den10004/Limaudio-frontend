import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

interface TagsProps {
  href: string;
  title: string;
}

interface TagListProps {
  tags: TagsProps[];
}

export default function Tags({ tags }: TagListProps) {
  return (
    <ul className={styles.popular__sort}>
      {tags.map((e, i) => (
        <li key={i} className={styles.tag}>
          <Link href="/">
            <Image src={e.href} alt={e.title} width={28} height={32} />
            <span>{e.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
