import styles from "./dayCell.module.css";
import { DayCellProps } from "../../../common/interfaces";

export default function DayCell({
  selectedDate,
  dayOfWeek,
  onChangeDate,
  heightAuto,
}: DayCellProps) {
  const dayCellStyles = `${styles.dayOfWeek} ${
    dayOfWeek.getMonth() !== selectedDate.getMonth() && !heightAuto
      ? styles.daysNotOfCurrentMonth
      : ""
  } ${
    dayOfWeek.getMonth() === selectedDate.getMonth() &&
    dayOfWeek.getDate() === selectedDate.getDate()
      ? styles.selectedDayOfWeek
      : ""
  } ${
    dayOfWeek.getMonth() === new Date().getMonth() &&
    dayOfWeek.getDate() === new Date().getDate()
      ? styles.today
      : ""
  } ${heightAuto ? styles.heightAuto : styles.height100}`;

  return (
    <div className={dayCellStyles} onClick={() => onChangeDate(dayOfWeek)}>
      {dayOfWeek.getDate()}
    </div>
  );
}
