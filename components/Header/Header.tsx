"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ModalHeader } from "../Modals/ModalHeader";
import { ModalQuestions } from "../Modals/ModalQuestions";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function Header() {
  const [headerMenu, setHeaderMenu] = useState(false);
  const [callbackModal, setCallbackModal] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategory = searchParams.get("category");

  const links = [
    { href: "/blog?category=обзоры", label: "Обзоры" },
    { href: "/blog?category=сравнения", label: "Сравнения" },
    { href: "/blog?category=топы", label: "Топы" },
    { href: "/blog?category=гайды-и-советы", label: "Гайды и советы" },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.header__block}>
            <div className={styles.header__logo_block}>
              <Link className={styles.header__logo} href="/">
                <Image
                  src="https://37490647-limaudio.s3.twcstorage.ru/LIMAUDIO_logo_black_cc78086bc5.png"
                  alt="logo"
                  width={150}
                  height={24}
                />
              </Link>

              {inputOpen && (
                <input
                  type="text"
                  className="search_input_header text16"
                  placeholder="Например, саундбар"
                />
              )}

              <ul className={styles.header__contacts_min}>
                <button
                  className="search-btn"
                  onClick={() => setInputOpen((prev) => !prev)}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="35"
                      height="35"
                      rx="17.5"
                      stroke="#0055CC"
                    />
                    <path
                      d="M16.6794 9C20.3683 9 23.3588 11.9895 23.3588 15.6773C23.3588 17.1929 22.8537 18.5905 22.0027 19.7111L26.7336 24.4461C27.0891 24.8018 27.0888 25.3783 26.7329 25.7337C26.377 26.0891 25.8003 26.0887 25.4448 25.733L20.7144 20.999C19.5934 21.8498 18.1954 22.3547 16.6794 22.3547C12.9905 22.3547 10 19.3651 10 15.6773C10 11.9895 12.9905 9 16.6794 9ZM16.6794 10.821C13.9965 10.821 11.8216 12.9952 11.8216 15.6773C11.8216 18.3594 13.9965 20.5337 16.6794 20.5337C19.3622 20.5337 21.5371 18.3594 21.5371 15.6773C21.5371 12.9952 19.3622 10.821 16.6794 10.821Z"
                      fill="#0055CC"
                    />
                  </svg>
                </button>
                <button onClick={() => setHeaderMenu(true)}>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="-0.5"
                      y="0.5"
                      width="35"
                      height="35"
                      rx="17.5"
                      transform="matrix(-1 0 0 1 35 0)"
                      stroke="#0055CC"
                    />
                    <rect
                      x="9"
                      y="11.25"
                      width="18"
                      height="1.5"
                      rx="0.75"
                      fill="#0055CC"
                    />
                    <rect
                      x="12"
                      y="17.25"
                      width="15"
                      height="1.5"
                      rx="0.75"
                      fill="#0055CC"
                    />
                    <rect
                      x="9"
                      y="23.25"
                      width="18"
                      height="1.5"
                      rx="0.75"
                      fill="#0055CC"
                    />
                  </svg>
                </button>
              </ul>
            </div>
            <nav>
              <ul>
                {links.map((link) => {
                  const linkCategory = new URLSearchParams(
                    link.href.split("?")[1]
                  ).get("category");
                  const isActive =
                    pathname === "/blog" && currentCategory === linkCategory;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{
                          color: isActive ? "var(--color-blue)" : "inherit",
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <ul className={styles.header__contacts}>
            <li>
              <Link href="tel: 88007700473"> 8 (800) 770-04-73</Link>
            </li>
            <li
              className={styles.header__btn}
              style={{ cursor: "pointer" }}
              onClick={() => setCallbackModal(true)}
            >
              Заказать звонок
            </li>
            <li>
              <Link href="https://wa.me/79200000000">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.8747 3.09167C14.1106 2.32009 13.2005 1.70831 12.1976 1.29197C11.1947 0.875636 10.1189 0.663073 9.03301 0.666671C4.48301 0.666671 0.774675 4.375 0.774675 8.925C0.774675 10.3833 1.15801 11.8 1.87467 13.05L0.708008 17.3333L5.08301 16.1833C6.29134 16.8417 7.64967 17.1917 9.03301 17.1917C13.583 17.1917 17.2913 13.4833 17.2913 8.93334C17.2913 6.725 16.433 4.65 14.8747 3.09167ZM9.03301 15.7917C7.79967 15.7917 6.59134 15.4583 5.53301 14.8333L5.28301 14.6833L2.68301 15.3667L3.37467 12.8333L3.20801 12.575C2.52263 11.4809 2.15878 10.2161 2.15801 8.925C2.15801 5.14167 5.24134 2.05834 9.02467 2.05834C10.858 2.05834 12.583 2.775 13.8747 4.075C14.5144 4.71156 15.0213 5.46879 15.366 6.30278C15.7108 7.13677 15.8865 8.03091 15.883 8.93334C15.8997 12.7167 12.8163 15.7917 9.03301 15.7917ZM12.7997 10.6583C12.5913 10.5583 11.5747 10.0583 11.3913 9.98334C11.1997 9.91667 11.0663 9.88334 10.9247 10.0833C10.783 10.2917 10.3913 10.7583 10.2747 10.8917C10.158 11.0333 10.033 11.05 9.82467 10.9417C9.61634 10.8417 8.94967 10.6167 8.16634 9.91667C7.54967 9.36667 7.14134 8.69167 7.01634 8.48334C6.89967 8.275 6.99967 8.16667 7.10801 8.05834C7.19967 7.96667 7.31634 7.81667 7.41634 7.7C7.51634 7.58334 7.55801 7.49167 7.62467 7.35834C7.69134 7.21667 7.65801 7.1 7.60801 7C7.55801 6.9 7.14134 5.88334 6.97467 5.46667C6.80801 5.06667 6.63301 5.11667 6.50801 5.10834H6.10801C5.96634 5.10834 5.74967 5.15834 5.55801 5.36667C5.37467 5.575 4.84134 6.075 4.84134 7.09167C4.84134 8.10834 5.58301 9.09167 5.68301 9.22501C5.78301 9.36667 7.14134 11.45 9.20801 12.3417C9.69967 12.5583 10.083 12.6833 10.383 12.775C10.8747 12.9333 11.3247 12.9083 11.683 12.8583C12.083 12.8 12.908 12.3583 13.0747 11.875C13.2497 11.3917 13.2497 10.9833 13.1913 10.8917C13.133 10.8 13.008 10.7583 12.7997 10.6583Z"
                    fill="#25D366"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="https://t.me/example_user">
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 17.5C13.1944 17.5 17 13.6944 17 9C17 4.30558 13.1944 0.5 8.5 0.5C3.80558 0.5 0 4.30558 0 9C0 13.6944 3.80558 17.5 8.5 17.5Z"
                    fill="#2AABEE"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.84747 8.91028C6.3254 7.83069 7.97773 7.11896 8.80448 6.77508C11.165 5.79325 11.6555 5.6227 11.9752 5.61706C12.0455 5.61583 12.2028 5.63325 12.3046 5.71589C12.3906 5.78566 12.4143 5.87992 12.4256 5.94608C12.4369 6.01223 12.451 6.16294 12.4398 6.2807C12.3119 7.62475 11.7584 10.8864 11.4768 12.3918C11.3576 13.0287 11.123 13.2423 10.8959 13.2632C10.4023 13.3086 10.0274 12.937 9.54936 12.6236C8.80125 12.1332 8.37861 11.8279 7.65244 11.3494C6.81323 10.7964 7.35725 10.4924 7.83552 9.99567C7.96069 9.86567 10.1355 7.88746 10.1776 7.70801C10.1829 7.68557 10.1878 7.60191 10.1381 7.55773C10.0884 7.51356 10.015 7.52866 9.9621 7.54068C9.88707 7.55771 8.69195 8.34763 6.37675 9.91046C6.03752 10.1434 5.73026 10.2569 5.45496 10.2509C5.15147 10.2444 4.56767 10.0793 4.13367 9.93827C3.60136 9.76524 3.17829 9.67376 3.21513 9.37989C3.23432 9.22683 3.4451 9.07029 3.84747 8.91028Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {headerMenu && <ModalHeader onClose={() => setHeaderMenu(false)} />}
      {callbackModal && (
        <ModalQuestions onClose={() => setCallbackModal(false)} />
      )}
    </>
  );
}
