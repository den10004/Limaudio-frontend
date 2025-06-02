import BlogCard from "../BlogCard";
import styles from "./page.module.css";
import { getCards } from "@/lib/cardsData";

export default async function PopularArticles() {
  const cards = await getCards();
  const firstThree = cards.slice(0, 3);

  return (
    <section className={styles.interes}>
      <div className="container">
        <h3 className="text-h3-bold">Популярные статьи</h3>
        <div className={styles.interes__card}>
          {/*
          {firstThree.map((card) => (
      
            <BlogCard key={card.id} card={card} type="small" />
          ))}*/}
        </div>
      </div>
    </section>
  );
}
