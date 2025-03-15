import React, { useEffect, useRef, useState } from "react";
import styles from "./weekView.module.css";
import { WeekProps, CalendarEvent } from "../../common/interfaces";
import { weekHeads, monthHeads, hoursOfDay } from "../../common";
import {
  getEvents,
  setSelectedHour,
  openDrawer,
  setSelectedDate,
  getSelectedDate,
  setSelectedEventID,
  getSelectedEvent,
} from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { motion } from "framer-motion";
import { convertTo12Hour } from "../../utils/dateTimeHelpers";

export default function WeekView({ week }: WeekProps) {
  const events = useAppSelector(getEvents);

  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(getSelectedDate);
  const selectedEventID = useAppSelector(getSelectedEvent);

  const currentTimeBlockRef = useRef<HTMLDivElement | null>(null);

  const findNearestTimeBlock = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const roundedQuarter = Math.floor(currentMinutes / 15) * 15; // Convert minutes to the nearest quarter-hour

    const formattedHour = currentHour % 12 === 0 ? 12 : currentHour % 12; // Convert to 12-hour format
    const period = currentHour >= 12 ? "PM" : "AM";
    const formattedMinutes =
      roundedQuarter === 0 ? "00" : roundedQuarter.toString();

    return `${formattedHour
      .toString()
      .padStart(2, "0")}:${formattedMinutes} ${period}`;
  };

  const handleTimeBlockClick = (
    date: Date,
    hour: string,
    timeQuarter: number,
    x: number,
    y: number
  ) => {
    if (selectedEventID) {
      dispatch(setSelectedEventID({ eventID: null }));
    }
    const hr = hour.split(":")[0];
    const per = hour.split(":")[1].split(" ")[1];
    const min = timeQuarter * 15 === 0 ? "00" : (timeQuarter * 15).toString();
    dispatch(setSelectedDate({ newDate: date.toISOString() }));
    dispatch(setSelectedHour({ hour: `${hr}:${min} ${per}` }));
    dispatch(openDrawer({ top: y, left: x }));
  };

  const handleClickEvent = (eve: CalendarEvent, x: number, y: number) => {
    dispatch(
      setSelectedEventID({
        eventID: eve.id,
      })
    );
    dispatch(setSelectedDate({ newDate: eve.event_date.toISOString() }));
    dispatch(openDrawer({ top: y, left: x }));
  };

  const getEventInPlace = (date: Date, hour: string, timeQuarter: number) => {
    const hr = hour.split(":")[0];
    const min = timeQuarter ? (timeQuarter * 15).toString() : "00";
    const period = hour.split(" ")[1];
    const currentTime = hr + ":" + min + " " + period;

    const currentEvent = events.filter(
      (e) =>
        convertTo12Hour(e.event_time) === currentTime &&
        e.event_date.getDate() === date.getDate() &&
        e.event_date.getMonth() === date.getMonth() &&
        e.event_date.getFullYear() === date.getFullYear()
    );

    if (currentEvent.length) {
      return (
        <>
          {currentEvent.map((eve: CalendarEvent, index) => (
            <motion.p
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 1.1 }}
              key={`event_time - ${index} event - date:${eve.event_date.toISOString()} time:${
                eve.event_time
              } title:${eve.title}`}
              className={styles.event}
              onClick={(e) => {
                e.stopPropagation();
                handleClickEvent(eve, e.pageX, e.pageY);
              }}
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
    setTimeout(() => {
      console.log("Scrolling");
      if (currentTimeBlockRef.current) {
        currentTimeBlockRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 500);
  }, []);

  return (
    <>
      <motion.div layout className={styles.weekHeadsContainer}>
        {week.map((dayOfWeek, index) => {
          return (
            <motion.div
              key={`Day Header ${index} ${
                monthHeads[dayOfWeek.getMonth()]
              } ${dayOfWeek.getDate()}`}
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
              onClick={() =>
                dispatch(setSelectedDate({ newDate: dayOfWeek.toISOString() }))
              }
            >
              {dayOfWeek.getDate()}
              <span className={styles.weekHead}>
                {weekHeads[dayOfWeek.getDay()]}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      <div className={styles.mainContainer}>
        {/* Ruler - Positioned at the current time block */}

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
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className={styles.timeBlockContainer}
              >
                {hoursOfDay.map((hour) => (
                  <div
                    className={styles.timeBlock}
                    key={`timeBlock - ${dayOfWeek.getDate()} - ${hour}`}
                  >
                    {dayOfWeek.getDay() === 0 && (
                      <div className={styles.timeBlockGuide}>{hour}</div>
                    )}

                    {[0, 1, 2, 3].map((timeQuarter) => {
                      const hr = hour.split(":")[0];
                      const per = hour.split(":")[1].split(" ")[1];
                      const min =
                        timeQuarter * 15 === 0
                          ? "00"
                          : (timeQuarter * 15).toString();
                      const currentBlockSpec = `${hr}:${min} ${per}`;
                      const isCurrentTimeBlock =
                        currentBlockSpec === findNearestTimeBlock();

                      return (
                        <motion.div
                          ref={isCurrentTimeBlock ? currentTimeBlockRef : null}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          key={`timeBlock - ${dayOfWeek.getDate()} - ${hour} - ${timeQuarter}`}
                          className={`${styles.timeBlockQuater}`}
                          onClick={(e) =>
                            handleTimeBlockClick(
                              dayOfWeek,
                              hour,
                              timeQuarter,
                              e.pageX,
                              e.pageY
                            )
                          }
                        >
                          {getEventInPlace(dayOfWeek, hour, timeQuarter)}
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
