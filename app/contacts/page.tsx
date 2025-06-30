import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollBtn from "@/components/ScrollBtn";
import Breadcrumbs from "@/components/Breadcrumbs";
import Subscription from "@/components/Subscription/Subscription";
import styles from "./page.module.css";
import { EMAIL, INDEX, TEL, TELLINK, TG, WHATSAPP } from "@/lib/breadcrumbs";
import QuestionForm from "@/components/QuestionForm";
import MapComponent from "@/components/Map";
import { Suspense } from "react";
import Link from "next/link";

const breadcrumbs = [
  { label: "Главная", href: INDEX },
  { label: "Контакты", href: "" },
];

export default function Contacts() {
  return (
    <>
      <div className="container" style={{ width: "100%" }}>
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <section className={styles.contacts}>
        <div className="container">
          <div className={styles.contacts__container}>
            <div className={`blockbg ${styles.contacts__about}`}>
              <h2 className="text-h2">Контакты</h2>

              <ul className={styles.contacts__list}>
                <li>
                  <label className="text">График работы: </label>
                  <span className="text20">с 9:00 до 18:00</span>
                </li>
                <li>
                  <label className="text">E-mail: </label>
                  <a className="text20" href="mailto:blog@yandex.ru">
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <label className="text">Телефон: </label>
                  <Link className="text20" href={TELLINK}>
                    {TEL}
                  </Link>
                </li>
              </ul>
              <p className="text">Адреса</p>
              <ul className={`text20 ${styles.contacts__address}`}>
                <li>г. Казань, ул. Бухарская, д. 32 к2</li>
                <li>г. Новосибирск, ул. Гаранина, д. 15</li>
              </ul>

              <div className={`text16 ${styles.contacts__btn}`}>
                <Link href={TG}>
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.44364 8.67938C7.08077 5.99804 10.8397 4.23034 12.7206 3.37627C18.0907 0.937736 19.2065 0.514137 19.9338 0.500149C20.0938 0.497073 20.4514 0.540353 20.6831 0.745594C20.8787 0.918895 20.9326 1.153 20.9583 1.31731C20.9841 1.48162 21.0162 1.85592 20.9907 2.14838C20.6997 5.48655 19.4405 13.5874 18.7999 17.3262C18.5288 18.9082 17.9951 19.4387 17.4784 19.4906C16.3554 19.6034 15.5027 18.6804 14.4151 17.902C12.7132 16.6841 11.7517 15.9259 10.0997 14.7373C8.19056 13.3638 9.42819 12.6089 10.5162 11.3751C10.801 11.0522 15.7486 6.13905 15.8444 5.69335C15.8564 5.63761 15.8675 5.42982 15.7544 5.32011C15.6414 5.21039 15.4745 5.24791 15.3541 5.27775C15.1834 5.32004 12.4646 7.28196 7.19761 11.1635C6.42588 11.742 5.72687 12.0239 5.10058 12.0091C4.41015 11.9929 3.08204 11.5829 2.09472 11.2326C0.883743 10.8028 -0.0787216 10.5756 0.00508745 9.84573C0.0487404 9.46558 0.528258 9.07679 1.44364 8.67938Z"
                      fill="#2AABEE"
                    />
                  </svg>
                  <span>Написать нам в Телеграм</span>
                </Link>
                <Link href={WHATSAPP}>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.2586 3.66666C22.0544 2.50003 20.6203 1.57502 19.0398 0.945522C17.4593 0.316023 15.764 -0.00537158 14.0528 6.79077e-05C6.88254 6.79077e-05 1.03865 5.60705 1.03865 12.4866C1.03865 14.6916 1.64274 16.8336 2.77212 18.7236L0.933594 25.2L7.82807 23.4612C9.73225 24.4566 11.8728 24.9858 14.0528 24.9858C21.223 24.9858 27.0669 19.3788 27.0669 12.4992C27.0669 9.16024 25.7143 6.02285 23.2586 3.66666ZM14.0528 22.869C12.1092 22.869 10.205 22.365 8.53721 21.42L8.14324 21.1932L4.04596 22.2264L5.13594 18.396L4.87329 18.0054C3.79322 16.3511 3.21983 14.4387 3.21862 12.4866C3.21862 6.76625 8.07758 2.10426 14.0397 2.10426C16.9288 2.10426 19.6472 3.18786 21.6827 5.15345C22.6907 6.11592 23.4896 7.26085 24.0329 8.52184C24.5762 9.78283 24.8531 11.1348 24.8476 12.4992C24.8738 18.2196 20.0149 22.869 14.0528 22.869ZM19.9886 15.1074C19.6603 14.9562 18.0581 14.2002 17.7692 14.0868C17.4672 13.986 17.2571 13.9356 17.0338 14.238C16.8106 14.553 16.1934 15.2586 16.0095 15.4602C15.8257 15.6744 15.6287 15.6996 15.3004 15.5358C14.9721 15.3846 13.9215 15.0444 12.687 13.986C11.7152 13.1544 11.0718 12.1338 10.8748 11.8188C10.6909 11.5038 10.8485 11.34 11.0192 11.1762C11.1637 11.0376 11.3475 10.8108 11.5051 10.6344C11.6627 10.458 11.7284 10.3194 11.8334 10.1178C11.9385 9.90364 11.886 9.72724 11.8072 9.57604C11.7284 9.42484 11.0717 7.88765 10.8091 7.25765C10.5465 6.65285 10.2707 6.72845 10.0737 6.71585H9.44334C9.22009 6.71585 8.87865 6.79145 8.57661 7.10645C8.2877 7.42145 7.44723 8.17745 7.44723 9.71464C7.44723 11.2518 8.61601 12.7386 8.77359 12.9402C8.93118 13.1544 11.0718 16.3044 14.3286 17.6526C15.1034 17.9802 15.7075 18.1692 16.1802 18.3078C16.955 18.5472 17.6642 18.5094 18.2289 18.4338C18.8592 18.3456 20.1593 17.6778 20.422 16.947C20.6977 16.2162 20.6977 15.5988 20.6058 15.4602C20.5139 15.3216 20.3169 15.2586 19.9886 15.1074Z"
                      fill="#25D366"
                    />
                  </svg>
                  <span>Написать нам в WhatsApp</span>
                </Link>
              </div>
            </div>
            <div className={styles.contacts__map}>
              <MapComponent />
            </div>
          </div>
        </div>
      </section>
      <ScrollBtn />
      <QuestionForm />
      <Subscription />
    </>
  );
}

export const revalidate = 60;
