"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import Tags from "../Tags";

const tags = [
  {
    href: "/homeСinema.png",
    title: "Домашний кинотеатр",
  },
  {
    href: "/outdoorAcoustics.png",
    title: "Напольная акустика",
  },
  {
    href: "/ShelfAcoustics.png",
    title: "Полочная акустика",
  },
  {
    href: "/Dolby.Atmos.png",
    title: "Dolby.Atmos",
  },
  {
    href: "/Subwoofers.jpg",
    title: "Сабвуферы",
  },
  {
    href: "/av.png",
    title: "AV Ресиверы",
  },
  {
    href: "/cap.png",
    title: "ЦАПы",
  },
  {
    href: "/Acoustic kits.png",
    title: "Комплекты акустики",
  },
  {
    href: "/AV-processors.jpg",
    title: "AV Процессоры",
  },
  {
    href: "/Amplifiers.png",
    title: "Предусилители",
  },

  {
    href: "/Preamps.jpg",
    title: "Усилители",
  },
  {
    href: "/Network players.jpg",
    title: "Сетевые проигрыватели",
  },
  {
    href: "/Vinyl Turntables.png",
    title: "Проигрыватели винила",
  },
  {
    href: "/Phono correctors.png",
    title: "Фонокорректоры",
  },
  {
    href: "/projector.png",
    title: "Проекторы и экраны",
  },
];

export default function Popular() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleList = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section className={styles.popular}>
      <div className="container">
        <div className={styles.popular__text}>
          <h3 className="text-h3-bold">Популярные темы</h3>
          <button
            className={`text-small ${styles.showbtnPopular}`}
            onClick={toggleList}
          >
            {isExpanded ? "Скрыть" : "Смотреть все"}
          </button>
        </div>
        <ul
          className={`${styles.popular__sort} ${
            !isExpanded ? styles.collapsed : ""
          }`}
          id="linksList"
        >
          <Tags tags={tags} />
        </ul>

        <div className={styles.popular__search}>
          <button className="text">
            <div>
              <div className={`${styles.strip} ${styles.strip_1}`}></div>
              <div className={`${styles.strip} ${styles.strip_2}`}></div>
              <div className={`${styles.strip} ${styles.strip_3}`}></div>
            </div>
            По дате
          </button>
          <button className="text">
            <div>
              <div className={`${styles.strip} ${styles.strip_1}`}></div>
              <div className={`${styles.strip} ${styles.strip_2}`}></div>
              <div className={`${styles.strip} ${styles.strip_3}`}></div>
            </div>
            По популярности
          </button>
          <input
            className={`${styles.search_input} text`}
            placeholder="Например, саундбар"
          />
        </div>
      </div>
    </section>
  );
}
