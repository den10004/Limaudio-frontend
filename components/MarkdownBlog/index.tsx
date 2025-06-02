"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Markdown({ blocs }: any) {
  console.log(blocs);
  return (
    <div>
      <>
        {blocs.map(
          (
            component: { __component: any; body: any; files: any[] },
            index: any
          ) => {
            switch (component.__component) {
              case "shared.rich-text":
                return (
                  <ReactMarkdown key={`richtext-${index}`}>
                    {component.body || ""}
                  </ReactMarkdown>
                );

              case "shared.slider":
                return (
                  <div
                    key={`slider-container-${index}`}
                    className="swiper"
                    style={{ position: "relative" }}
                  >
                    <Swiper
                      modules={[Navigation]}
                      navigation={{
                        nextEl: `.swiper-button-next-${index}`,
                        prevEl: `.swiper-button-prev-${index}`,
                      }}
                      slidesPerView={1}
                      loop={true}
                    >
                      {component.files?.map((file, fileIndex) => (
                        <SwiperSlide key={`slide-${index}-${fileIndex}`}>
                          <img
                            src={file.url}
                            alt={`Slide ${fileIndex}`}
                            className={styles.img_slider}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <div className="swiper-navigation">
                      <button className={`swiper-button-prev-${index}`}>
                        &lt;sadasd
                      </button>
                      <button className={`swiper-button-next-${index} `}>
                        &gt;sadasd
                      </button>
                    </div>
                  </div>
                );

              default:
                return null;
            }
          }
        )}
      </>
    </div>
  );
}
