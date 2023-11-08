export const createWeekData = (existingDate: Date) => {
  let firstDayOfWeek = new Date(existingDate);
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
  const week: Array<Date> = [firstDayOfWeek];

  for (let i = 0; i < 6; i++) {
    const newDate = new Date(
      week[i].getFullYear(),
      week[i].getMonth(),
      week[i].getDate() + 1
    );
    week.push(newDate);
  }
  return week;
};
