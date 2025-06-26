"use client";
import { YMInitializer } from "react-yandex-metrika";
import { usePathname } from "next/navigation";

const YANDEX_ID = [103022816];

const YandexMetrika = () => {
  const pathname = usePathname();

  return (
    <YMInitializer
      accounts={YANDEX_ID}
      options={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      }}
      version="2"
    />
  );
};

export default YandexMetrika;
