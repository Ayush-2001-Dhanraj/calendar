import React, { useEffect, useState } from "react";
import styles from "./container.module.css";
import Month from "../monthView";
import { calendarViews, changeMonthControls } from "../../common";
import Header from "../header";
import WeekView from "../weekView";
import YearView from "../yearView";

export default function Container() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [weekData, setWeekData] = useState<Array<Date>>([]);
  const [monthData, setMonthData] = useState<Array<Array<Date>>>([]);
  const [yearData, setYearData] = useState<Array<Array<Array<Date>>>>([]);

  const [viewSelected, setViewSelected] = useState<calendarViews>(
    calendarViews.WEEK
  );

  const handleChangeSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  const createWeekData = (existingDate: Date) => {
    console.log("week");
    let firstDayOfWeek = new Date(existingDate);
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
    const week: Array<Date> = [firstDayOfWeek];

    for (let i = 0; i < 6; i++) {
      const newDate = new Date(
        week[i].getFullYear(),
        week[i].getMonth(),
        week[i].getDate() + 1
      );
      week.push(newDate);
    }
    return week;
  };

  const createMonthData = (existingDate: Date) => {
    let firstDateOfWeek = new Date(existingDate);
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

    return month;
  };

  const createYearData = (existingDate: Date) => {
    console.log("Year");
    const year: Array<Array<Array<Date>>> = [];

    for (let i = 0; i < 12; i++) {
      const firstDate = new Date(existingDate.getFullYear(), 0 + i, 1);
      const month: Array<Array<Date>> | undefined = createMonthData(firstDate);
      year.push(month);
    }
    return year;
  };

  const createCalendarDate = () => {
    if (viewSelected === calendarViews.MONTH) {
      if (
        monthData[2] &&
        monthData[2][6] &&
        monthData[2][6].getMonth() === selectedDate.getMonth()
      ) {
        return;
      }
      const updatedData: Array<Array<Date>> = createMonthData(selectedDate);
      setMonthData(updatedData);
    } else if (viewSelected === calendarViews.WEEK) {
      const updatedData: Array<Date> = createWeekData(selectedDate);
      setWeekData(updatedData);
    } else if (viewSelected === calendarViews.YEAR) {
      const updatedData: Array<Array<Array<Date>>> =
        createYearData(selectedDate);
      setYearData(updatedData);
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
      {viewSelected === calendarViews.WEEK && (
        <WeekView
          week={weekData}
          selectedDate={selectedDate}
          onChangeDate={handleChangeSelectedDate}
        />
      )}
      {viewSelected === calendarViews.MONTH && (
        <Month
          month={monthData}
          selectedDate={selectedDate}
          onChangeDate={handleChangeSelectedDate}
        />
      )}
      {viewSelected === calendarViews.YEAR && (
        <YearView
          year={yearData}
          selectedDate={selectedDate}
          onChangeDate={handleChangeSelectedDate}
        />
      )}
    </div>
  );
}
