import styles from "./page.module.css";

export default function Article() {
  return (
    <div className={styles.blog__art}>
      <div className={styles.article__img}>
        <img
          src="./images/Marshall Major V Brown.webp"
          alt="Marshall Major V Brown"
        />
      </div>
      <div className={styles.article__headline}>
        <p className="text16">Беспроводные накладные наушники</p>
        <h3 className="text-h3-bold">Marshall Major V Brown</h3>
      </div>
      <div className={styles.article__desc}>
        <h2 className="text-h2">13 980 ₽</h2>
        <p className="text">
          Беспроводные накладные наушники с более чем 100 часами автономной
          работы
        </p>
        <ul>
          <li className="text-small">
            <p>Минимальная воспроизводимая частота, Гц</p>
            <p>20</p>
          </li>
          <li className="text-small">
            <p>Максимальная воспроизводимая частота, Гц</p>
            <p>20</p>
          </li>
          <li className="text-small">
            <p>Версия Bluetooth</p>
            <p>5.3</p>
          </li>
          <li className="text-small">
            <p>Встроенный микрофон</p>
            <p>Да</p>
          </li>
          <li className="text-small">
            <p>Разъем для зарядки</p>
            <p>USB-C, QI</p>
          </li>
        </ul>
      </div>
      <div className={styles.article__btn}>
        <button className="blogbtnwhite standart-btn text consultation">
          Получить консультацию
        </button>
        <button className="blogbtnblue standart-btn text order">
          Заказать
        </button>
      </div>
    </div>
  );
}
