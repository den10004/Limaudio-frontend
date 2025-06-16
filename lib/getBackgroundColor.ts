export const getBackgroundColor = (type: string) => {
  switch (type) {
    case "Обзоры":
      return "#2AABEE";
    case "Сравнения":
      return "#2CAE35";
    case "Топы":
      return "#FFCA2B";
    case "Гайды и советы":
      return "#8067FF";
    default:
      return "#e0e0e0";
  }
};
