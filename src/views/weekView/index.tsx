import React from "react";
import styles from "./weekView.module.css";
import { WeekProps } from "../../common/interfaces";
import { calendarViews, monthHeads } from "../../common";
import WeekHeads from "../../components/weekHeads";

export default function WeekView({
  week,
  selectedDate,
  onChangeDate,
}: WeekProps) {
  return (
    <div className={styles.weekView}>
      <WeekHeads view={calendarViews.WEEK} />
      <div className={styles.mainContainer}>
        {week.map((dayOfWeek, index) => {
          return (
            <div
              key={`Day cel ${index} ${
                monthHeads[dayOfWeek.getMonth()]
              } ${dayOfWeek.getDate()}`}
              className={`${styles.DateNumberContainer}`}
            >
              <span
                className={`${styles.DateNumber} ${
                  new Date().getDate() === dayOfWeek.getDate() &&
                  new Date().getFullYear() === dayOfWeek.getFullYear() &&
                  new Date().getMonth() === dayOfWeek.getMonth()
                    ? styles.currentDate
                    : ""
                }  ${
                  selectedDate.getDate() === dayOfWeek.getDate()
                    ? styles.selectedDate
                    : ""
                }`}
                onClick={() => onChangeDate(dayOfWeek)}
              >
                {dayOfWeek.getDate()}
              </span>
              <div className={styles.timeZoneSection}> </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
