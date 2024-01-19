import React, { useEffect, useRef } from "react";
import styles from "./weekView.module.css";
import { WeekProps } from "../../common/interfaces";
import { weekHeads, monthHeads, hoursOfDay } from "../../common";
import {
  getEvents,
  setSelectedHour,
  openDrawer,
  setSelectedDate,
} from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { motion } from "framer-motion";

export default function WeekView({
  week,
  selectedDate,
  onChangeDate,
}: WeekProps) {
  const events = useAppSelector(getEvents);
  const calendarRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const handleTimeBlockClick = (
    date: Date,
    hour: string,
    timeQuater: number,
    x: number,
    y: number
  ) => {
    const hr = hour.split(":")[0];
    const per = hour.split(":")[1].split(" ")[1];
    const min = timeQuater * 15 === 0 ? "00" : (timeQuater * 15).toString();
    dispatch(setSelectedDate({ newDate: date.toISOString() }));
    dispatch(setSelectedHour({ hour: `${hr}:${min} ${per}` }));
    dispatch(openDrawer({ top: y, left: x }));
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
      return (
        <>
          {currentEvent.map((eve) => (
            <motion.p
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 1.1 }}
              key={`event - date:${eve.date.toISOString()} time:${
                eve.time
              } title:${eve.title}`}
              className={styles.event}
            >
              {eve.title}
            </motion.p>
          ))}
        </>
      );
    }
  };

  useEffect(() => {
    // set page title
    document.title = "Calendar - Week";
  }, []);

  return (
    <div className={styles.weekView} ref={calendarRef}>
      <div className={styles.mainContainer}>
        {week.map((dayOfWeek, index) => {
          return (
            <motion.div
              layout
              key={`Day cel ${index} ${
                monthHeads[dayOfWeek.getMonth()]
              } ${dayOfWeek.getDate()}`}
              className={`${styles.DateNumberContainer}`}
            >
              <motion.div
                layout
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
              </motion.div>

              <motion.div layout className={styles.timeBlockContainer}>
                {hoursOfDay.map((hour) => (
                  <div
                    className={styles.timeBlock}
                    key={`timeBlock - ${dayOfWeek.getDate()} - ${hour}`}
                  >
                    {dayOfWeek.getDay() === 0 && (
                      <div className={styles.timeBlockGuide}>{hour}</div>
                    )}

                    {[0, 1, 2, 3].map((timeQuater) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        key={`timeBlock - ${dayOfWeek.getDate()} - ${hour} - ${timeQuater}`}
                        className={`${styles.timeBlockQuater}`}
                        onClick={(e) =>
                          handleTimeBlockClick(
                            dayOfWeek,
                            hour,
                            timeQuater,
                            e.pageX,
                            e.pageY
                          )
                        }
                      >
                        {getEventInPlace(dayOfWeek, hour, timeQuater)}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
