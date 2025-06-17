"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import CardSkeleton from "../Loading/CardSkeleton";

interface Brand {
  slug: string;
  title: string;
  logo: {
    url: string;
  };
}

export default function BrandSearch() {
  const [allCards, setAllCards] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const url = searchTerm
          ? `/api/brandSearch?search=${encodeURIComponent(searchTerm)}`
          : "/api/brandSearch";

        const res = await fetch(url);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Ошибка при загрузке");
        }

        const cards = await res.json();
        const card = cards.data;

        setAllCards(card);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  console.log(allCards);

  return (
    <section className={styles.search}>
      <div className="container">
        <form className={styles.search__form}>
          <input
            type="text"
            placeholder="Например, саундбар"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            className="text16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.50006 0C8.53765 0 11.0001 2.46256 11.0001 5.50029C11.0001 6.74868 10.5842 7.89993 9.88346 8.82304L13.7791 12.7233C14.0718 13.0164 14.0715 13.4913 13.7785 13.784C13.4854 14.0767 13.0105 14.0764 12.7178 13.7834L8.82266 9.88388C7.89959 10.5847 6.74839 11.0006 5.50006 11.0006C2.46246 11.0006 0 8.53802 0 5.50029C0 2.46256 2.46246 0 5.50006 0ZM5.50006 1.5C3.2909 1.5 1.5 3.29098 1.5 5.50029C1.5 7.70961 3.2909 9.50058 5.50006 9.50058C7.70921 9.50058 9.50011 7.70961 9.50011 5.50029C9.50011 3.29098 7.70921 1.5 5.50006 1.5Z"
              fill="#0055CC"
            />
          </svg>

          <button className="text16">Найти</button>
        </form>

        {isLoading && <CardSkeleton />}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!isLoading && allCards.length === 0 && (
          <div style={{ fontSize: "40px", fontWeight: 600 }}>
            Нет доступных брендов
          </div>
        )}

        {allCards.map((brand, index) => (
          <div key={index}>{brand.title}</div>
        ))}

        <div className={styles.alphabet_container}>
          <div
            className={styles.alphabet_row}
            id="englishAlphabetContainer"
          ></div>
          <div
            className={styles.alphabet_row}
            id="russianAlphabetContainer"
          ></div>
        </div>
        <div className={styles.brand_list} id="brandList">
          <h2 id="selectedLetter"></h2>
          <ul id="brandItems" className={styles.multi_column_list}></ul>
        </div>
        <div className={styles.load_more_container} style={{ display: "flex" }}>
          <button id="load-more" className="text showbtn">
            Показать ещё
          </button>
          <div className={styles.pagination} id="pagination"></div>
        </div>
      </div>
    </section>
  );
}
