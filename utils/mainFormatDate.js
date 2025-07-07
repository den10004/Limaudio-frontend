/**
 * Преобразование ISO даты в формат "день месяц год"
 * @param {string} isoDate
 * @returns {string}
 */
export const formatIsoToDDMMYYYY = (isoDate) => {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  return `${day} ${months[month - 1]} ${year} г`;
};
