import React, { useState } from "react";
import styles from "./calendar.module.css";

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const CalendarMain = ({ currentDate, setCurrentDate }) => {
  const localDate = {
    number: currentDate.getDate(),
    day: currentDate.getDay(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

  const month = [];

  localDate.number = localDate.number % 7;
  localDate.number = localDate.number - localDate.day;
  localDate.day = 0;

  if (localDate.number < 1) {
    localDate.number += daysInMonth(localDate.month, localDate.year);
  }

  for (let j = 0; j <= 5; j++) {
    const oneWeek = [];
    for (let i = 0; i <= 6; i++) {
      if (
        i > 0 &&
        oneWeek[i - 1] > daysInMonth(localDate.month, localDate.year) - 1
      ) {
        localDate.number = 1 - i;
      }
      oneWeek.push(localDate.number + i);
    }
    localDate.number = oneWeek[6] + 1;
    localDate.day = 0;
    month.push(oneWeek);
  }

  const handleOnClickDay = (day) => {
    console.log("sdk", day);
    console.log("sdk", localDate);
    console.log("sdk", currentDate);
  };

  return (
    <>
      {month.map((week) => (
        <div className={styles.week}>
          {week.map((day) => (
            <div className={styles.day} onClick={() => handleOnClickDay(day)}>
              {day}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <div className={styles.Calendar}>
      <CalendarMain currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </div>
  );
}
