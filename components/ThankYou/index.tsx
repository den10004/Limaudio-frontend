"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThankYou() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  return (
    <div>
      <h2 className="text-h2">
        {name ? decodeURIComponent(name) : "Гость"}, спасибо за заявку!
      </h2>
      <p className="text">Мы свяжемся с Вами в ближайшее время </p>
      <p className="text">График работы: Пн-Пт с 9:00 до 18:00 по Москве</p>
      <p className="text">
        Если Вы оставили заявку в нерабочее время, мы перезвоним Вам на
        следующий рабочий день.
      </p>
      <Link href="/">
        <button className="blogbtnblue">Вернуться на главную</button>
      </Link>
    </div>
  );
}
