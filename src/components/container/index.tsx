import React, { useEffect, useState } from "react";
import styles from "./container.module.css";
import Month from "../monthView";
import { calendarViews, changeMonthControls } from "../../common";
import Header from "../header";
import WeekView from "../weekView";
import YearView from "../yearView";

export default function Container() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [calendarData, setCalendarData] = useState<Array<Array<Date>>>([]);

  const [viewSelected, setViewSelected] = useState<calendarViews>(
    calendarViews.WEEK
  );

  const handleChangeSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  const createMonthData = () => {
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
  const createWeekData = () => {};
  const createYearData = () => {};

  const createCalendarDate = () => {
    if (viewSelected === calendarViews.MONTH) {
      createMonthData();
    } else if (viewSelected === calendarViews.WEEK) {
      createWeekData();
    } else if (viewSelected === calendarViews.YEAR) {
      createYearData();
    }
  };

  const handleChangeMonth = (control: changeMonthControls) => {
    const newMonth =
      control === changeMonthControls.NEXT
        ? selectedDate.getMonth() + 1
        : selectedDate.getMonth() - 1;
    const newSelectedDate = new Date(selectedDate.getFullYear(), newMonth, 1);
    handleChangeSelectedDate(newSelectedDate);
  };

  const onClickNext = () => handleChangeMonth(changeMonthControls.NEXT);
  const onClickBack = () => handleChangeMonth(changeMonthControls.BACK);
  const onClickToday = () => handleChangeSelectedDate(new Date());

  useEffect(() => {
    createCalendarDate();
  }, [selectedDate, viewSelected]);

  return (
    <div className={styles.container}>
      <Header
        selectedDate={selectedDate}
        onClickNext={onClickNext}
        onClickBack={onClickBack}
        viewSelected={viewSelected}
        onClickToday={onClickToday}
        setViewSelected={setViewSelected}
      />
      {viewSelected === calendarViews.WEEK && <WeekView />}
      {viewSelected === calendarViews.MONTH && (
        <Month
          selectedDate={selectedDate}
          calendarData={calendarData}
          onChangeDate={handleChangeSelectedDate}
        />
      )}
      {viewSelected === calendarViews.YEAR && <YearView />}
    </div>
  );
}
