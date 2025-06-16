"use client";
import styles from "./page.module.css";
import ReactMarkdown from "react-markdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Markdown({ blocs }: any) {
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
                    style={{ position: "relative", margin: "10px 0" }}
                  >
                    <Swiper
                      modules={[Navigation]}
                      navigation={{
                        nextEl: `.blog-button-next`,
                        prevEl: `.blog-button-prev`,
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
                      <button className="blog-button-prev">
                        <svg
                          width="15"
                          height="10"
                          viewBox="0 0 15 10"
                          fill="none"
                          className="style-color-arrow"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.575736 5.42426C0.341421 5.18995 0.341421 4.81005 0.575736 4.57574L4.39411 0.757359C4.62843 0.523045 5.00833 0.523045 5.24264 0.757359C5.47696 0.991674 5.47696 1.37157 5.24264 1.60589L1.84853 5L5.24264 8.39411C5.47696 8.62843 5.47696 9.00833 5.24264 9.24264C5.00833 9.47696 4.62843 9.47696 4.39411 9.24264L0.575736 5.42426ZM15 5.6H1V4.4H15V5.6Z"
                            fill="#0055CC"
                          />
                        </svg>
                      </button>
                      <button className="blog-button-next">
                        <svg
                          width="15"
                          height="10"
                          viewBox="0 0 15 10"
                          className="style-color-arrow"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.4243 5.42426C14.6586 5.18995 14.6586 4.81005 14.4243 4.57574L10.6059 0.757359C10.3716 0.523045 9.99167 0.523045 9.75736 0.757359C9.52304 0.991674 9.52304 1.37157 9.75736 1.60589L13.1515 5L9.75736 8.39411C9.52304 8.62843 9.52304 9.00833 9.75736 9.24264C9.99167 9.47696 10.3716 9.47696 10.6059 9.24264L14.4243 5.42426ZM0 5.6H14V4.4H0V5.6Z"
                            fill="#0055CC"
                          />
                        </svg>
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
