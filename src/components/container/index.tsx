import React, { useCallback, useEffect, useState } from "react";
import styles from "./container.module.css";
import { calendarViews, changeMonthControls } from "../../common";
import Header from "../header";
import WeekView from "../../views/weekView";
import YearView from "../../views/yearView";
import MonthView from "../../views/monthView";
import { createYearData } from "../../utils/createYearData";
import { createWeekData } from "../../utils/createWeekData";
import { createMonthData } from "../../utils/createMonthData";

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

  const createCalendarDate = useCallback(() => {
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
      console.log("week called");
      const updatedData: Array<Date> = createWeekData(selectedDate);
      setWeekData(updatedData);
    } else if (viewSelected === calendarViews.YEAR) {
      if (
        yearData[5] &&
        yearData[5][2][6] &&
        yearData[5][2][6].getFullYear() === selectedDate.getFullYear()
      ) {
        return;
      }
      const updatedData: Array<Array<Array<Date>>> =
        createYearData(selectedDate);
      setYearData(updatedData);
    }
  }, [monthData, selectedDate, viewSelected]);

  const handleChangeMonth = (control: changeMonthControls) => {
    switch (viewSelected) {
      case calendarViews.WEEK:
        const delta = control === changeMonthControls.NEXT ? 7 : -7;

        const newWeek = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate() - selectedDate.getDay() + delta
        );
        handleChangeSelectedDate(newWeek);
        break;
      case calendarViews.MONTH:
        const newMonth =
          control === changeMonthControls.NEXT
            ? selectedDate.getMonth() + 1
            : selectedDate.getMonth() - 1;
        const newSelectedDate = new Date(
          selectedDate.getFullYear(),
          newMonth,
          1
        );
        handleChangeSelectedDate(newSelectedDate);
        break;
      case calendarViews.YEAR:
        const newYear = new Date(
          control === changeMonthControls.NEXT
            ? selectedDate.getFullYear() + 1
            : selectedDate.getFullYear() - 1,
          0,
          1
        );
        handleChangeSelectedDate(newYear);
        break;

      default:
        break;
    }
  };

  const onClickNext = () => handleChangeMonth(changeMonthControls.NEXT);
  const onClickBack = () => handleChangeMonth(changeMonthControls.BACK);
  const onClickToday = () => handleChangeSelectedDate(new Date());

  useEffect(() => {
    createCalendarDate();
  }, [createCalendarDate, selectedDate, viewSelected]);

  return (
    <div className={styles.container}>
      <Header
        selectedDate={selectedDate}
        onClickNext={onClickNext}
        onClickBack={onClickBack}
        viewSelected={viewSelected}
        onClickToday={onClickToday}
        setViewSelected={setViewSelected}
        week={weekData}
      />
      {viewSelected === calendarViews.WEEK && (
        <WeekView
          week={weekData}
          selectedDate={selectedDate}
          onChangeDate={handleChangeSelectedDate}
        />
      )}
      {viewSelected === calendarViews.MONTH && (
        <MonthView
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
