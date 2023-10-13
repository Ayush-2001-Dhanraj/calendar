import React, { useEffect, useState } from "react";
import styles from "./calendar.module.css";

const getFirstDayOfCurrentMonth = (currentDate) => {
  let firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // skew towards sunday
  firstDay.setDate(firstDay.getDate() - firstDay.getDay());

  const temp = firstDay.getMonth();

  while (temp === firstDay.getMonth()) firstDay.setDate(firstDay.getDate() - 7);

  return firstDay;
};

const MonthCalendar = ({ currentDate, setCurrentDate }) => {
  const handleOnClickDay = (date) => {
    console.log(date);
    setCurrentDate(date);
  };

  const [month, setMonth] = useState([]);

  useEffect(() => {
    setMonth([]);

    const firstDay = getFirstDayOfCurrentMonth(currentDate);
    const currentDateCopy = new Date(firstDay); // Create a copy of the first day to avoid modifying it.

    console.log("firstDay", firstDay);
    console.log("currentDate", currentDate);

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        const dayCopy = new Date(currentDateCopy);
        dayCopy.setDate(currentDateCopy.getDate() + i * 7 + j);
        week.push(dayCopy);
      }
      console.log("week", week);
      setMonth((preV) => [...preV, week]);
    }
  }, [currentDate]);

  return (
    <>
      <div className={styles.week}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((heads) => (
          <div className={styles.day} key={heads}>
            {heads}
          </div>
        ))}
      </div>
      {month.map((week, index) => (
        <div className={styles.week} key={index}>
          {week.map((day, index) => (
            <div
              className={styles.day}
              onClick={() => handleOnClickDay(day)}
              key={index}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

const months = [
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

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 11, 1));

  return (
    <div className={styles.Calendar}>
      <h3>
        {currentDate.getFullYear()} {months[currentDate.getMonth()]}
      </h3>
      <MonthCalendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
    </div>
  );
}
