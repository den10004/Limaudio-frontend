import { Roboto } from "next/font/google";
import "./../styles/globals.css";
import "./../styles/search-menu.css";
import "./../styles/blogmainpage.css";
import "./../styles/bloglist.css";
import "./../styles/label.css";
import "./../styles/modal.css";
import "./../styles/interes.css";
import { Suspense } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import YandexMetrika from "@/components/YandexMetrika";
import UtmSaver from "@/components/UtmSaver";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={roboto.className}
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Suspense fallback={<div></div>}>
          <Header />
          <UtmSaver />
        </Suspense>
        {children}
        <Footer />
        <YandexMetrika />
      </body>
    </html>
  );
}
