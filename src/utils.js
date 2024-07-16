import { months } from "./constants";

export const formatDate = (dateStr) => {
  const [year, month, day] = dateStr?.split("-")?.map(Number);
  const date = new Date(year, month - 1, day);

  return `${months[date.getMonth()]} ${date.getDate()}`;
};
