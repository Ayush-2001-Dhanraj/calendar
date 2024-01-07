import React from "react";
import styles from "./weekView.module.css";
import { WeekProps } from "../../common/interfaces";
import { weekHeads, monthHeads, hoursOfDay } from "../../common";

export default function WeekView({
  week,
  selectedDate,
  onChangeDate,
}: WeekProps) {
  const handleTimeBlockClick = (
    date: Date,
    hour: string,
    timeQuater: number
  ) => {
    console.log("Date: ", date, " hour: ", hour, "quater: ", timeQuater);
  };
  return (
    <div className={styles.weekView}>
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
                <span className={styles.weekHead}>
                  {weekHeads[dayOfWeek.getDay()]}
                </span>
              </span>

              <div className={styles.timeBlockContainer}>
                {hoursOfDay.map((hour) => (
                  <div
                    className={styles.timeBlock}
                    key={`timeBlock - ${dayOfWeek.getDate()} - ${hour}`}
                  >
                    {dayOfWeek.getDay() === 0 && (
                      <div className={styles.timeBlockGuide}>{hour}</div>
                    )}

                    {[1, 2, 3, 4].map((timeQuater) => (
                      <div
                        key={`timeBlock - ${dayOfWeek.getDate()} - ${hour} - ${timeQuater}`}
                        className={styles.timeBlockQuater}
                        onClick={() =>
                          handleTimeBlockClick(dayOfWeek, hour, timeQuater)
                        }
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
