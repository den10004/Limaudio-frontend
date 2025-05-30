import styles from "./page.module.css";

export default function ApplicationForm() {
  return (
    <div className={styles.application}>
      <h2 className="text-h2">Оставьте заявку</h2>
      <p>Мы поможем подобрать лучшую напольную акустику для ваших задач</p>

      <div className={styles.application__form}>
        <div style={{ position: "relative" }}>
          <img src="/manager.webp" alt="менеджер" />
          <div className={styles.form__expert}>
            <h3 className="text" style={{ fontWeight: "600" }}>
              Айрат Насыбуллин
            </h3>
            <p className="text-small">руководитель отдела Hi-END AV</p>
          </div>
        </div>
        <form
          className={styles.application__sendform}
          action="/sendform"
          method="POST"
        >
          <div className={styles.application__form_group}>
            <label className="text-small" htmlFor="name">
              Введите имя*
            </label>
            <input
              className="inputform"
              type="text"
              id="name"
              minLength={3}
              name="name"
              required
              placeholder="Гость"
            />
          </div>

          <div className={styles.application__form_group}>
            <label className="text-small" htmlFor="phone">
              Введите номер телефона*
            </label>
            <input
              className="inputform"
              type="tel"
              id="phone"
              name="phone"
              pattern="(\+?\d[- .]*){7,}"
              required
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <button type="submit" className="blogbtnblue standart-btn text-h3">
            Подобрать акустику
          </button>
        </form>
      </div>
    </div>
  );
}
