"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export const Info: React.FC<{
  res: string;
  colors?: string;
  title?: string;
}> = ({ res, colors }) => {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (res) {
      setShowInfo(true);

      const timer = setTimeout(() => {
        setShowInfo(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [res]);

  return (
    showInfo && (
      <div className={`${styles.infoModal} ${showInfo ? "" : "hide"}`}>
        <div style={{ color: colors }}>{res}</div>
      </div>
    )
  );
};
