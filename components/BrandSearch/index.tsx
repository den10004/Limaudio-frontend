"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import CardSkeleton from "../Loading/CardSkeleton";
import Link from "next/link";

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
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const latinAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        let url = "/api/brandSearch";

        if (searchTerm && !/^[a-zA-Z]$/.test(searchTerm)) {
          url += `?search=${encodeURIComponent(searchTerm)}`;
        } else if (selectedLetter) {
          url += `?startsWith=${encodeURIComponent(selectedLetter)}`;
        }

        const res = await fetch(url);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Ошибка при загрузке");
        }

        const cards = await res.json();
        setAllCards(cards.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [searchTerm, selectedLetter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (/^[a-zA-Z]$/.test(value)) {
      setSelectedLetter(value.toUpperCase());
    } else if (value === "") {
      setSelectedLetter("A");
    } else {
      setSelectedLetter("");
    }
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    setSearchTerm("");
  };

  const filteredBrands = allCards;

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

        {error && <div style={{ color: "red" }}>{error}</div>}

        <div className={styles.alphabet_container}>
          <div className={styles.alphabet_row} id="englishAlphabetContainer">
            {latinAlphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className={`${styles.alphabet_button} ${
                  selectedLetter === letter ? styles.active : ""
                }`}
                type="button"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {isLoading && <CardSkeleton />}

        {!isLoading && (
          <div className={styles.brand_list} id="brandList">
            {selectedLetter && <h2 id="selectedLetter">{selectedLetter}</h2>}
            <ul id="brandItems" className={styles.multi_column_list}>
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand, index) => (
                  <li key={index}>
                    <Link
                      href={`/brands/${brand.slug}`}
                      rel="noopener noreferrer"
                    >
                      {brand.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  {searchTerm
                    ? "Бренды не найдены"
                    : `Нет брендов на букву ${selectedLetter}`}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
