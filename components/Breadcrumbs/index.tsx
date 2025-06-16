import Link from "next/link";
import styles from "./page.module.css";

export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div>
      <nav aria-label="Хлебные крошки" className={styles.breadcrumbs_container}>
        <div className={styles.breadcrumbs_container}>
          <ol className={`${styles.breadcrumbs} text16`}>
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={item.isActive ? styles.active : undefined}
                  aria-current={item.isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <span className={styles.separator}></span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </div>
  );
}
