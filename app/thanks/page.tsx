"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { useSearchParams } from 'next/navigation';

export default function Thanks() {
  const searchParams = useSearchParams();
  const name = searchParams ? searchParams.get('name') : null;
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent}>
        <section className={styles.thanks}>
          <div className="container">
            <div className={styles.thanks__wrap}>
              <div className={styles.thanks__info}>
                <div>
                  <h2 className="text-h2"> {name ? decodeURIComponent(name) : 'Гость'}, спасибо за заявку!</h2>
                  <p className="text">Мы свяжемся с Вами в ближайшее время </p>
                  <p className="text">
                    График работы: Пн-Пт с 9:00 до 18:00 по Москве
                  </p>
                  <p className="text">
                    Если Вы оставили заявку в нерабочее время, мы перезвоним Вам
                    на следующий рабочий день.
                  </p>
                  <Link href="/">
                    <button className="blogbtnblue">
                      Вернуться на главную
                    </button>
                  </Link>
                </div>
              </div>
              <div className={styles.thanks__img}>
                <Image fill src="/thanks.webp" alt="спасибо" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
