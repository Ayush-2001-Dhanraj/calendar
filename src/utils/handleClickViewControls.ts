import { headerActions, calendarViews } from "../common";

export const handleClickViewControls = (
  action: headerActions,
  viewSelected: calendarViews,
  selectedDate: Date,
  handleChangeSelectedDate: (date: Date) => void
) => {
  if (action === headerActions.TODAY) {
    handleChangeSelectedDate(new Date());
    return;
  }

  switch (viewSelected) {
    case calendarViews.WEEK:
      const delta = action === headerActions.NEXT ? 7 : -7;
      const newWeek = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() - selectedDate.getDay() + delta
      );
      handleChangeSelectedDate(newWeek);
      break;
    case calendarViews.MONTH:
      const newMonth =
        action === headerActions.NEXT
          ? selectedDate.getMonth() + 1
          : selectedDate.getMonth() - 1;
      const newSelectedDate = new Date(selectedDate.getFullYear(), newMonth, 1);
      handleChangeSelectedDate(newSelectedDate);
      break;
    case calendarViews.YEAR:
      const newYear = new Date(
        action === headerActions.NEXT
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
