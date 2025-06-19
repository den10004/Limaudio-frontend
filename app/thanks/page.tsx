import Image from "next/image";
import styles from "./page.module.css";
import { Suspense } from "react";
import ThankYou from "@/components/ThankYou";

export default function Thanks() {
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent}>
        <section className={styles.thanks}>
          <div className="container">
            <div className={styles.thanks__wrap}>
              <div className={styles.thanks__info}>
                <Suspense fallback={<div></div>}>
                  <ThankYou />
                </Suspense>
              </div>
              <div className={styles.thanks__img}>
                <Image fill src="/thanks.webp" alt="спасибо" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
