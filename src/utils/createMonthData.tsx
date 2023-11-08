import { createWeekData } from "./createWeekData";

export const createMonthData = (existingDate: Date) => {
  let firstDateOfWeek = new Date(existingDate);
  let temp = firstDateOfWeek.getDate() - firstDateOfWeek.getDay();
  // skew towards sunday
  firstDateOfWeek.setDate(firstDateOfWeek.getDate() - firstDateOfWeek.getDay());

  // factor to push back date
  let count = 0;
  while (temp > 0) {
    temp -= 7;
    count++;
  }

  // push back date
  firstDateOfWeek.setDate(firstDateOfWeek.getDate() - count * 7);

  const month: Array<Array<Date>> = [];

  for (let j = 0; j < 6; j++) {
    const week = createWeekData(firstDateOfWeek);

    month.push(week);
    // firstDateOfWeek is last week last date + 1
    firstDateOfWeek = new Date(
      week[6].getFullYear(),
      week[6].getMonth(),
      week[6].getDate() + 1
    );
  }

  return month;
};
