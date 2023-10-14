import styles from "./dayCell.module.css";
import { DayCellProps } from "../../../common/interfaces";

export default function DayCell({
  selectedDate,
  dayOfWeek,
  onChangeDate,
}: DayCellProps) {
  const dayCellStyles = `${styles.dayOfWeek} ${
    dayOfWeek.getMonth() !== selectedDate.getMonth()
      ? styles.daysNotOfCurrentMonth
      : ""
  } ${
    dayOfWeek.getMonth() === selectedDate.getMonth() &&
    dayOfWeek.getDate() === selectedDate.getDate()
      ? styles.selectedDayOfWeek
      : ""
  }`;

  return (
    <div className={dayCellStyles} onClick={() => onChangeDate(dayOfWeek)}>
      {dayOfWeek.getDate()}
    </div>
  );
}
