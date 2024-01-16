import React, { useRef, useEffect } from "react";
import styles from "./weekView.module.css";
import { WeekProps } from "../../common/interfaces";
import { weekHeads, monthHeads, hoursOfDay } from "../../common";
import { getEvents, getSelectedHour, toggleDrawer } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export default function WeekView({
  week,
  selectedDate,
  onChangeDate,
}: WeekProps) {
  const events = useAppSelector(getEvents);
  const selectedHour = useAppSelector(getSelectedHour);
  const calendarRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const handleTimeBlockClick = (
    date: Date,
    hour: string,
    timeQuater: number
  ) => {
    const hr = hour.split(":")[0];
    const min = timeQuater ? (timeQuater * 15).toString() : "00";
    const period = hour.split(" ")[1];
    const currentTime = hr + ":" + min + " " + period;
    console.log(
      "Date: ",
      date,
      " hour: ",
      hour,
      "quater: ",
      timeQuater,
      "currentTime",
      currentTime
    );
    dispatch(toggleDrawer());
  };

  const getEventInPlace = (date: Date, hour: string, timeQuater: number) => {
    const hr = hour.split(":")[0];
    const min = timeQuater ? (timeQuater * 15).toString() : "00";
    const period = hour.split(" ")[1];
    const currentTime = hr + ":" + min + " " + period;

    const currentEvent = events.filter(
      (e) =>
        e.time === currentTime &&
        e.date.getDate() === date.getDate() &&
        e.date.getMonth() === date.getMonth() &&
        e.date.getFullYear() === date.getFullYear()
    );
    if (currentEvent.length) {
      return <p>{currentEvent[0].title}</p>;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (calendarRef.current && selectedHour) {
        const hours = parseInt(selectedHour.split(":")[0]);
        calendarRef.current.scrollTop = 100 * hours;
      }
    }, 2000);
  }, [selectedHour]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <div className={styles.weekView} ref={calendarRef}>
      <div className={styles.mainContainer}>
        {week.map((dayOfWeek, index) => {
          return (
            <div
              key={`Day cel ${index} ${
                monthHeads[dayOfWeek.getMonth()]
              } ${dayOfWeek.getDate()}`}
              className={`${styles.DateNumberContainer}`}
            >
              <div
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
              </div>

              <div className={styles.timeBlockContainer}>
                {hoursOfDay.map((hour) => (
                  <div
                    className={styles.timeBlock}
                    key={`timeBlock - ${dayOfWeek.getDate()} - ${hour}`}
                  >
                    {dayOfWeek.getDay() === 0 && (
                      <div className={styles.timeBlockGuide}>{hour}</div>
                    )}

                    {[0, 1, 2, 3].map((timeQuater) => (
                      <div
                        key={`timeBlock - ${dayOfWeek.getDate()} - ${hour} - ${timeQuater}`}
                        className={`${styles.timeBlockQuater}`}
                        onClick={() =>
                          handleTimeBlockClick(dayOfWeek, hour, timeQuater)
                        }
                      >
                        {getEventInPlace(dayOfWeek, hour, timeQuater)}
                      </div>
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
