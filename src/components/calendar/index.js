import React, { useState } from "react";
import styles from "./calendar.module.css";

function CalendarDays(props) {
  const firstDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1
  );
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {currentDays.map((day) => {
        return (
          <div
            className={
              "calendar-day" +
              (day.currentMonth ? " current" : "") +
              (day.selected ? " selected" : "")
            }
            onClick={() => props.changeCurrentDay(day)}
          >
            <p>{day.number}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function Calendar() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleChangeDate = (day) => {
    setCurrentDate(new Date(day.year, day.month, day.number));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
      </div>
      <div className="calendar-body">
        <div className="table-header">
          {weekdays.map((head) => (
            <div className={styles.weekHead}>{head}</div>
          ))}
        </div>
        <CalendarDays day={currentDate} changeCurrentDay={handleChangeDate} />
      </div>
    </div>
  );
}
