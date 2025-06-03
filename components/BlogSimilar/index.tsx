import Link from "next/link";
import styles from "./page.module.css";
import { Card } from "@/types/card";

type CardItemProps = {
  card: Card;
  type?: "big" | "small";
};

const getBackgroundColor = (type: string) => {
  switch (type) {
    case "Обзор":
      return "#2AABEE";
    case "Статья":
      return "#0055CC";
    case "Сравнение":
      return "#2CAE35";
    case "Топ":
      return "#FFCA2B";
    case "Гайд":
      return "#8067FF";
    case "Совет":
      return "#C6DCFD";
    default:
      return "#e0e0e0";
  }
};

export default function BlogSimilar() {
  return <div></div>;
}
