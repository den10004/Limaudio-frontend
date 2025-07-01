import styles from "./page.module.css";

export default function Comments() {
  return (
    <div className={styles.comments}>
      <h3 className="text-h3-bold">Комментарии (60)</h3>

      <div className={styles.comments__cards}>
        <article className={styles.comments__card}>
          <time className="text-small" dateTime="16-04-2025">
            16/04/2025
          </time>
          <h3>Иван Иванов</h3>

          <div>
            <p className="text">
              Обычная блютуз моногарнитура для разговоров. Музыку через нее не
              слушаю разумеется. Есть два варианта кодеков sbc и аac. При sbc в
              принципе голос мой и собеседника можно охарактеризовать как HD
              аудио. Нет глухости или обрезки каких то частот.  Где то слышал
              что лучше отключить aac и выбрать sbc , якобы у sbc потребление
              процессором гарнитуры меньше, и в моем случае дольше на 4 часа
              будет работать ( аккумулятор гарнитуры 300 мАч). Есть такое?
            </p>
          </div>

          <div className={styles.comments__btn}>
            <a href="#reply" className={`text16 ${styles.comment_reply} `}>
              Ответить на комментарий
            </a>
          </div>
        </article>
        <article className={styles.comments__card}>
          <time className="text-small" dateTime="16-04-2025">
            16/04/2025
          </time>
          <h3>Иван Иванов</h3>

          <div>
            <p className="text">
              Обычная блютуз моногарнитура для разговоров. Музыку через нее не
              слушаю разумеется. Есть два варианта кодеков sbc и аac. При sbc в
              принципе голос мой и собеседника можно охарактеризовать как HD
              аудио. Нет глухости или обрезки каких то частот.  Где то слышал
              что лучше отключить aac и выбрать sbc , якобы у sbc потребление
              процессором гарнитуры меньше, и в моем случае дольше на 4 часа
              будет работать ( аккумулятор гарнитуры 300 мАч). Есть такое?
            </p>
          </div>

          <div className={styles.comments__btn}>
            <a href="#reply" className={`text16 ${styles.comment_reply} `}>
              Ответить на комментарий
            </a>
          </div>
        </article>

        <div className={styles.comments__nav}>
          <div className={styles.number_buttons}>
            <button className={`text16 ${styles.number_button}`}>1</button>
            <button className={styles.number_button}>2</button>
            <button className={styles.number_button}>3</button>
            <button className={styles.number_button}>4</button>
            <button className={`text16 ${styles.number_button}`}>
              <svg
                width="15"
                height="8"
                viewBox="0 0 15 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z"
                  fill="#BEBEBE"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${styles.comments__send} ${styles.comments__card}`}
          id="reply"
        >
          <h3 className="text-h3-bold">Оставить комментарий</h3>

          <form
            className={styles.comments__send__form}
            action="/sendform"
            method="POST"
          >
            <div className={styles.comments__send__form_group}>
              <label className="text-small" htmlFor="name">
                Введите имя*
              </label>
              <input
                type="text"
                className="inputform"
                id="name"
                minLength={3}
                name="name"
                required
                placeholder="Гость"
              />
            </div>
            <div className={styles.comments__send__form_group}>
              <label className="text-small" htmlFor="comment-area">
                Комментарий*
              </label>
              <textarea
                className="inputform"
                id="comments"
                name="comment-area"
                required
                placeholder="Введите ваш комментарий"
              ></textarea>
            </div>

            <button type="submit" className="blogbtnblue standart-btn text-h3">
              Отправить
              <svg
                width="26"
                height="25"
                viewBox="0 0 26 25"
                className="send-img"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.06072 0.31243C1.02893 -0.180428 -0.10464 0.76243 0.190003 1.86707L2.35 9.93814C2.40414 10.141 2.51667 10.3235 2.67363 10.4629C2.83058 10.6023 3.02505 10.6926 3.23286 10.7224L13.8229 12.2353C14.1293 12.2781 14.1293 12.7217 13.8229 12.7656L3.23393 14.2774C3.02612 14.3073 2.83166 14.3975 2.6747 14.537C2.51774 14.6764 2.40521 14.8589 2.35107 15.0617L0.190003 23.1371C-0.10464 24.2406 1.02893 25.1835 2.06072 24.6917L25.0943 13.7106C26.1111 13.2264 26.1111 11.7778 25.0943 11.2924L2.06072 0.31243Z"
                  fill="white"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
