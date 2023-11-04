import React from "react";
import styles from "./weekView.module.css";
import { WeekProps } from "../../common/interfaces";
import WeekHeads from "../weekHeads";
import { calendarViews, monthHeads } from "../../common";

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
                  new Date().getDate() === dayOfWeek.getDate()
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
