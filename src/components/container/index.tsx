import React, { useEffect, useState } from "react";
import styles from "./container.module.css";
import Month from "../monthView";

export default function Container() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [calendarData, setCalendarData] = useState<Array<Array<Date>>>([]);

  const handleChangeSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  const createCalendarDate = () => {
    if (
      calendarData[2] &&
      calendarData[2][6] &&
      calendarData[2][6].getMonth() === selectedDate.getMonth()
    ) {
      return;
    }

    let firstDateOfWeek = new Date(selectedDate);
    let temp = firstDateOfWeek.getDate() - firstDateOfWeek.getDay();
    // skew towards sunday
    firstDateOfWeek.setDate(
      firstDateOfWeek.getDate() - firstDateOfWeek.getDay()
    );

    // factor to push back date
    let count = 0;
    while (temp > 0) {
      temp -= 7;
      count++;
    }

    // push back date
    firstDateOfWeek.setDate(firstDateOfWeek.getDate() - count * 7);

    const month: Array<Array<Date>> = [];

    for (let j = 0; j < 6; j++) {
      let week = [firstDateOfWeek];
      for (let i = 0; i < 6; i++) {
        // increase date by 1
        const localDate = new Date(
          week[i].getFullYear(),
          week[i].getMonth(),
          week[i].getDate() + 1
        );
        week.push(localDate);
      }

      month.push(week);
      // firstDateOfWeek is last week last date + 1
      firstDateOfWeek = new Date(
        week[6].getFullYear(),
        week[6].getMonth(),
        week[6].getDate() + 1
      );
    }

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
