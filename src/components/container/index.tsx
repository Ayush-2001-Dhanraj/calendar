import React, { useCallback, useEffect, useState } from "react";
import styles from "./container.module.css";
import { calendarViews, calendarViewControls } from "../../common";
import Header from "../header";
import WeekView from "../../views/weekView";
import YearView from "../../views/yearView";
import MonthView from "../../views/monthView";
import { createWeekData, createMonthData, createYearData } from "clad-calendar";
import { handleClickViewControls } from "../../utils/handleClickViewControls";

export default function Container() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [weekData, setWeekData] = useState<Array<Date>>([]);
  const [monthData, setMonthData] = useState<Array<Array<Date>>>([]);
  const [yearData, setYearData] = useState<Array<Array<Array<Date>>>>([]);

  const [viewSelected, setViewSelected] = useState<calendarViews>(
    calendarViews.WEEK
  );

  const handleChangeSelectedDate = (date: Date) => setSelectedDate(date);

  const createCalendarDate = useCallback(() => {
    switch (viewSelected) {
      case calendarViews.WEEK:
        console.log("week called");
        setWeekData(createWeekData(selectedDate));
        break;
      case calendarViews.MONTH:
        if (
          monthData[2] &&
          monthData[2][6] &&
          monthData[2][6].getMonth() === selectedDate.getMonth()
        ) {
          return;
        }
        setMonthData(createMonthData(selectedDate));
        break;
      case calendarViews.YEAR:
        if (
          yearData[5] &&
          yearData[5][2][6] &&
          yearData[5][2][6].getFullYear() === selectedDate.getFullYear()
        ) {
          return;
        }
        setYearData(createYearData(selectedDate));
        break;

      default:
        break;
    }
  }, [monthData, selectedDate, viewSelected]);

  const onClickNext = () =>
    handleClickViewControls(
      calendarViewControls.NEXT,
      viewSelected,
      selectedDate,
      handleChangeSelectedDate
    );
  const onClickBack = () =>
    handleClickViewControls(
      calendarViewControls.BACK,
      viewSelected,
      selectedDate,
      handleChangeSelectedDate
    );
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
