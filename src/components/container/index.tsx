import React, { useEffect, useState } from "react";
import styles from "./container.module.css";
import Month from "../month";

export default function Container() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [calendarData, setCalendarData] = useState<Array<Array<Date>>>([]);

  const handleChangeSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  const createCalendarDate = () => {
    let firstDateOfWeek = new Date(selectedDate);
    let temp = firstDateOfWeek.getDate() - firstDateOfWeek.getDay();
    firstDateOfWeek.setDate(
      firstDateOfWeek.getDate() - firstDateOfWeek.getDay()
    );

    console.log("sdk temp", temp);
    let count = 0;
    while (temp > 0) {
      temp -= 7;
      count++;
    }
    console.log("sdk before firstDateOfWeek", firstDateOfWeek);
    console.log("sdk count", count);
    firstDateOfWeek.setDate(firstDateOfWeek.getDate() - count * 7);
    console.log("sdk after firstDateOfWeek", firstDateOfWeek);

    const month: Array<Array<Date>> = [];

    for (let j = 0; j < 6; j++) {
      let week = [firstDateOfWeek];
      for (let i = 0; i < 6; i++) {
        const localDate = new Date(
          week[i].getFullYear(),
          week[i].getMonth(),
          week[i].getDate() + 1
        );
        week.push(localDate);
      }
      console.log("sdk week", week);
      month.push(week);
      firstDateOfWeek = new Date(
        week[6].getFullYear(),
        week[6].getMonth(),
        week[6].getDate() + 1
      );
    }

    console.log("sdk month", month);
    setCalendarData(month);
  };

  useEffect(() => {
    createCalendarDate();
  }, [selectedDate]);

  return (
    <div className={styles.container}>
      <Month
        selectedDate={selectedDate}
        calendarData={calendarData}
        onChangeDate={handleChangeSelectedDate}
      />
    </div>
  );
}
