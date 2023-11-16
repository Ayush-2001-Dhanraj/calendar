import { calendarViewControls, calendarViews } from "../common";

export const handleClickViewControls = (
  control: calendarViewControls,
  viewSelected: calendarViews,
  selectedDate: Date,
  handleChangeSelectedDate: (date: Date) => void
) => {
  switch (viewSelected) {
    case calendarViews.WEEK:
      const delta = control === calendarViewControls.NEXT ? 7 : -7;
      const newWeek = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() - selectedDate.getDay() + delta
      );
      handleChangeSelectedDate(newWeek);
      break;
    case calendarViews.MONTH:
      const newMonth =
        control === calendarViewControls.NEXT
          ? selectedDate.getMonth() + 1
          : selectedDate.getMonth() - 1;
      const newSelectedDate = new Date(selectedDate.getFullYear(), newMonth, 1);
      handleChangeSelectedDate(newSelectedDate);
      break;
    case calendarViews.YEAR:
      const newYear = new Date(
        control === calendarViewControls.NEXT
          ? selectedDate.getFullYear() + 1
          : selectedDate.getFullYear() - 1,
        0,
        1
      );
      handleChangeSelectedDate(newYear);
      break;

    default:
      break;
  }
};
