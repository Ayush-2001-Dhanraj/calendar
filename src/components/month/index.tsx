import React from "react";
import styles from "./month.module.css";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";

interface MonthProps {
  selectedDate: Date;
  onChangeDate: (arg0: Date) => void;
  calendarData: Array<Array<Date>>;
}

const weekHeads = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthHeads = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

enum changeMonthControls {
  NEXT = "NEXT",
  BACK = "BACK",
}

export default function Month({
  selectedDate,
  onChangeDate,
  calendarData,
}: MonthProps) {
  const handleChangeMonth = (control: changeMonthControls) => {
    const newMonth =
      control === changeMonthControls.NEXT
        ? selectedDate.getMonth() + 1
        : selectedDate.getMonth() - 1;
    const newSelectedDate = new Date(selectedDate.getFullYear(), newMonth, 1);
    onChangeDate(newSelectedDate);
  };

  const onClickNext = () => handleChangeMonth(changeMonthControls.NEXT);
  const onClickBack = () => handleChangeMonth(changeMonthControls.BACK);

  return (
    <div className={styles.month}>
      <div className={styles.monthHead}>
        <button onClick={onClickBack} className={styles.monthChangers}>
          <HiOutlineArrowLeft />
        </button>
        {`${monthHeads[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
        <button onClick={onClickNext} className={styles.monthChangers}>
          <HiOutlineArrowRight />
        </button>
      </div>
      <div key={"hha"} className={styles.week}>
        {weekHeads.map((head: string) => (
          <div key={"hha"} className={styles.headsOfWeek}>
            {head}
          </div>
        ))}
      </div>
      {calendarData.map((week) => (
        <div key={"hha"} className={styles.week}>
          {week.map((dayOfWeek) => (
            <div
              key={"mama"}
              className={`${styles.dayOfWeek} ${
                dayOfWeek.getMonth() !== selectedDate.getMonth()
                  ? styles.daysNotOfCurrentMonth
                  : ""
              } ${
                dayOfWeek.getMonth() === selectedDate.getMonth() &&
                dayOfWeek.getDate() === selectedDate.getDate()
                  ? styles.selectedDayOfWeek
                  : ""
              }`}
              onClick={() => onChangeDate(dayOfWeek)}
            >
              {dayOfWeek.getDate()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
