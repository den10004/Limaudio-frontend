export const decodeMultipleTimes = (title: string) => {
  return decodeURIComponent(title)
    .replace(/\s/g, "-")
    .replace(/[^\w-]/g, "");
};
