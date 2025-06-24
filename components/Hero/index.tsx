import styles from "./page.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className="container2">
        <div className="cards_container">
          <section className={styles.hero__background}>
            <h1>
              Домашние кинотеатры
              <br />и High-End аудио
            </h1>
            <p className="text-h3">
              Обзоры, идеи и секреты идеального просмотра
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
