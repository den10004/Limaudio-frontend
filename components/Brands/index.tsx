"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Headline from "@/app/UI/headline";
import Image from "next/image";
import styles from "./page.module.css";
import "swiper/css";
import "swiper/css/navigation";
import CardSkeleton from "../Loading/CardSkeleton";

interface Brand {
  slug: string;
  title: string;
  logo: {
    url: string;
  };
}

export default function Brands() {
  const [allCards, setAllCards] = useState<Brand[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => setIsExpanded(!isExpanded);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/brands");
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
  }, []);

  return (
    <section className={styles.brands}>
      <div className="container">
        <div className={styles.brand_head}>
          <Headline text={"Бренды"} link={"/brands"} />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!isLoading && allCards.length === 0 && (
          <div style={{ fontSize: "40px", fontWeight: 600 }}>
            Нет доступных брендов
          </div>
        )}
        {isLoading && <CardSkeleton heightPx="242px" />}
        <div className="brands__block" style={{ position: "relative" }}>
          {!isExpanded && (
            <>
              <button
                className={`brand-button-prev ${styles.brand_button_prev}`}
                ref={prevRef}
                aria-label="Предыдущий слайд"
              >
                <svg
                  width="15"
                  height="10"
                  viewBox="0 0 15 10"
                  fill="none"
                  className="style_color_arrow"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.575736 5.42426C0.341421 5.18995 0.341421 4.81005 0.575736 4.57574L4.39411 0.757359C4.62843 0.523045 5.00833 0.523045 5.24264 0.757359C5.47696 0.991674 5.47696 1.37157 5.24264 1.60589L1.84853 5L5.24264 8.39411C5.47696 8.62843 5.47696 9.00833 5.24264 9.24264C5.00833 9.47696 4.62843 9.47696 4.39411 9.24264L0.575736 5.42426ZM15 5.6H1V4.4H15V5.6Z"
                    fill="#0055CC"
                  />
                </svg>
              </button>

              <button
                className={`brand-button-next ${styles.brand_button_next}`}
                ref={nextRef}
                aria-label="Следующий слайд"
              >
                <svg
                  width="15"
                  height="10"
                  viewBox="0 0 15 10"
                  className="style_color_arrow"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4243 5.42426C14.6586 5.18995 14.6586 4.81005 14.4243 4.57574L10.6059 0.757359C10.3716 0.523045 9.99167 0.523045 9.75736 0.757359C9.52304 0.991674 9.52304 1.37157 9.75736 1.60589L13.1515 5L9.75736 8.39411C9.52304 8.62843 9.52304 9.00833 9.75736 9.24264C9.99167 9.47696 10.3716 9.47696 10.6059 9.24264L14.4243 5.42426ZM0 5.6H14V4.4H0V5.6Z"
                    fill="#0055CC"
                  />
                </svg>
              </button>
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={{
                  nextEl: ".brand-button-next",
                  prevEl: ".brand-button-prev",
                }}
                onInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                breakpoints={{
                  320: { slidesPerView: 1.5 },
                  425: { slidesPerView: 2 },
                  600: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1000: { slidesPerView: 5 },
                  1280: { slidesPerView: 6 },
                }}
                modules={[Navigation]}
                className={`brandSlider ${styles.SwiperSlide}`}
              >
                {allCards.map((brand, index) => (
                  <SwiperSlide key={index} className={styles.brand_style}>
                    <Link href={`/brands/${brand.slug}`}>
                      <Image
                        src={brand?.logo?.url || "/empty.webp"}
                        alt={brand?.title}
                        width={119}
                        height={122}
                        style={{ objectFit: "contain" }}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}

          {isExpanded && (
            <div className={styles.brands_grid}>
              {allCards.map((brand, index) => (
                <div key={index} className={styles.brand_card}>
                  <Link href={`/brands/${brand.slug}`}>
                    <Image
                      src={brand?.logo?.url || "/empty.webp"}
                      alt={brand?.title}
                      width={119}
                      height={122}
                      style={{ objectFit: "contain" }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}

          <button
            className={`text showbtn ${styles.showbtnslider}`}
            onClick={handleToggle}
          >
            {isExpanded ? "Скрыть" : "Посмотреть все"}
          </button>
        </div>
      </div>
    </section>
  );
}
