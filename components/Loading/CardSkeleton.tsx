import styles from "./page.module.css";

type CardSkeletonProps = {
  heightPx?: string;
  marginPx?: string;
  widthPx?: string;
};

export default function CardSkeleton({
  heightPx = "100px",
  marginPx = "auto",
  widthPx = "",
}: CardSkeletonProps) {
  return (
    <div
      style={{ height: heightPx, marginTop: marginPx, width: widthPx }}
      className={styles.cardSkeleton}
    ></div>
  );
}
