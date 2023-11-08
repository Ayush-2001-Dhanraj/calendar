import { createMonthData } from "./createMonthData";

export const createYearData = (existingDate: Date) => {
  const year: Array<Array<Array<Date>>> = [];

  for (let i = 0; i < 12; i++) {
    const firstDate = new Date(existingDate.getFullYear(), 0 + i, 1);
    const month: Array<Array<Date>> = createMonthData(firstDate);
    year.push(month);
  }
  return year;
};
