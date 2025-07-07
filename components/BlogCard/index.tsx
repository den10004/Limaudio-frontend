"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getBackgroundColor } from "@/lib/getBackgroundColor";
import { formatIsoToDDMMYYYY } from "@/utils/mainFormatDate";

type cover = {
  url: string;
};

type name = {
  name: string;
};

type comments = {
  count: number;
};

export type Card = {
  type: string;
  category: name;
  comments: comments;
  cover: cover;
  createdAt: string;
  description: string;
  documentId: string;
  id: number;
  publishedAt: string;
  slug: string;
  title: string;
  date?: string;
  topics?: any;
  updatedAt: string;
  views: number;
};

type CardItemProps = {
  card: Card;
  type: "big" | "small";
};

export default function BlogCard({ card, type }: any) {
  return (
    <Link href={`/blog/${card.slug}`}>
      <div
        className={`card ${type === "big" ? "wide" : "small"}`}
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <div style={{ position: "relative" }}>
          {card.cover?.url ? (
            <div className="card__img" style={{ position: "relative" }}>
              <Image
                src={card.cover.url}
                alt={card.title}
                fill
                sizes="100%"
                priority
              />
            </div>
          ) : (
            <div className="card__img" style={{ position: "relative" }}>
              <Image src="/empty.webp" alt="blog" fill />
            </div>
          )}

          <div className="labelblock-big">
            {card.category?.name && (
              <div
                className="label comparison-label label-color"
                style={{
                  backgroundColor: getBackgroundColor(card.category?.name),
                  color:
                    card.type === "silver" || card.type === "gold"
                      ? "black"
                      : "white",
                }}
              >
                {card.category?.name}
              </div>
            )}
            <div className="label show-label show-label-min label-color">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.00013 3.75C4.91713 3.75 2.64838 6.9255 1.84213 8.337C1.67638 8.6265 1.59388 8.772 1.60213 8.988C1.61188 9.204 1.70938 9.345 1.90363 9.627C2.86363 11.0205 5.47063 14.25 9.00013 14.25C12.5296 14.25 15.1366 11.0205 16.0966 9.627C16.2916 9.345 16.3891 9.204 16.3974 8.988C16.4056 8.772 16.3239 8.6265 16.1581 8.337C15.3526 6.9255 13.0831 3.75 9.00013 3.75Z"
                  stroke="black"
                ></path>
                <path
                  d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                  stroke="black"
                ></path>
              </svg>
              {card.views}
            </div>{" "}
            <div className="label show-label show-label-min label-color">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.666508 7.06399C0.666508 5.81137 1.03795 4.58689 1.73387 3.54538C2.42978 2.50387 3.41891 1.69211 4.57618 1.21275C5.73345 0.733396 7.00687 0.607975 8.23541 0.852348C9.46396 1.09672 10.5925 1.69991 11.4782 2.58565C12.3639 3.47138 12.9671 4.59987 13.2115 5.82842C13.4559 7.05696 13.3304 8.33038 12.8511 9.48765C12.3717 10.6449 11.56 11.634 10.5185 12.33C9.47694 13.0259 8.25246 13.3973 6.99984 13.3973H1.16651C1.06768 13.3972 0.971097 13.3679 0.888953 13.3129C0.806809 13.258 0.742791 13.1799 0.704984 13.0886C0.667176 12.9973 0.657275 12.8968 0.676531 12.7999C0.695788 12.703 0.743337 12.6139 0.813175 12.544L2.18184 11.1747C1.20226 10.0292 0.66476 8.57116 0.666508 7.06399ZM6.99984 1.73065C5.94498 1.73062 4.9138 2.04339 4.0367 2.62942C3.1596 3.21545 2.47598 4.04842 2.0723 5.02298C1.66862 5.99755 1.563 7.06993 1.7688 8.10452C1.97461 9.13911 2.48259 10.0894 3.22851 10.8353C3.32214 10.9291 3.37473 11.0562 3.37473 11.1887C3.37473 11.3212 3.32214 11.4482 3.22851 11.542L2.37384 12.3973H6.99984C8.41433 12.3973 9.77088 11.8354 10.7711 10.8352C11.7713 9.83503 12.3332 8.47848 12.3332 7.06399C12.3332 5.6495 11.7713 4.29295 10.7711 3.29275C9.77088 2.29256 8.41433 1.73065 6.99984 1.73065Z"
                  fill="#1C1C1C"
                ></path>
              </svg>

              {card.comments.count}
            </div>
          </div>
        </div>
        <div className="card__desc">
          <h2 className="text-h2d">{card.title}</h2>
          <p className="text">{card.description}</p>
          <span className="text16">{formatIsoToDDMMYYYY(card.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
