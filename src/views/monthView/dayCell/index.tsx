import styles from "./dayCell.module.css";
import { DayCellProps } from "../../../common/interfaces";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getSelectedDate, setSelectedDate } from "../../../redux/appSlice";

export default function DayCell({ dayOfWeek, heightAuto }: DayCellProps) {
  const selectedDate = useAppSelector(getSelectedDate);
  const dispatch = useAppDispatch();

  const dayCellStyles = `${styles.dayOfWeek} ${
    dayOfWeek.getMonth() !== selectedDate.getMonth() && !heightAuto
      ? styles.daysNotOfCurrentMonth
      : ""
  } ${
    dayOfWeek.getMonth() === selectedDate.getMonth() &&
    dayOfWeek.getDate() === selectedDate.getDate() &&
    dayOfWeek.getFullYear() === selectedDate.getFullYear()
      ? styles.selectedDayOfWeek
      : ""
  } ${
    dayOfWeek.getMonth() === new Date().getMonth() &&
    dayOfWeek.getDate() === new Date().getDate() &&
    dayOfWeek.getFullYear() === new Date().getFullYear()
      ? styles.today
      : ""
  } ${heightAuto ? styles.heightAuto : styles.height100}`;

  return (
    <div
      className={dayCellStyles}
      onClick={() =>
        dispatch(setSelectedDate({ newDate: dayOfWeek.toISOString() }))
      }
    >
      {dayOfWeek.getDate()}
    </div>
  );
}
