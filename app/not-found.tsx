import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ flex: 1 }}>
      <div className="container">
        <div style={{ marginTop: "100px", textAlign: "center" }}>
          <h2 className="text-h2">Страница не найдена</h2>
          <p className="text-h3" style={{ margin: "50px 0" }}>
            Извините, мы не смогли найти страницу, которую вы ищете.
          </p>
          <button className="text-h3" style={{ background: "none" }}>
            <Link href="/">Вернуться на главную</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
