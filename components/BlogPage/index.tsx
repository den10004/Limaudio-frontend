"use client";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function BlogPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";

  return (
    <div className="container">
      <h2 className="text-h3-bold" style={{ margin: "40px 0" }}>
        Блог {category}
      </h2>
    </div>
  );
}
