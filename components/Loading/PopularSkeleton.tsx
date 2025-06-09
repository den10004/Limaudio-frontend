import styles from "./page.module.css";

export default function PopularSkeleton() {
  return (
    <div className={styles.popular__sort}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
}
