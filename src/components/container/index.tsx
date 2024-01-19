import React, { useCallback, useEffect, useState } from "react";
import styles from "./container.module.css";
import { calendarViews, headerActions } from "../../common";
import Header from "../header";
import WeekView from "../../views/weekView";
import YearView from "../../views/yearView";
import MonthView from "../../views/monthView";
import { createWeekData, createMonthData, createYearData } from "clad-calendar";
import { handleClickViewControls } from "../../utils/handleClickViewControls";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  getSelectedDate,
  getViewSelected,
  setSelectedDate,
} from "../../redux/appSlice";
import { motion } from "framer-motion";

export default function Container() {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(getSelectedDate);

  const [weekData, setWeekData] = useState<Array<Date>>([]);
  const [monthData, setMonthData] = useState<Array<Array<Date>>>([]);
  const [yearData, setYearData] = useState<Array<Array<Array<Date>>>>([]);

  const viewSelected = useAppSelector(getViewSelected);

  const handleChangeSelectedDate = (newDate: Date) =>
    dispatch(setSelectedDate({ newDate: newDate.toISOString() }));

  const createCalendarDate = useCallback(() => {
    switch (viewSelected) {
      case calendarViews.WEEK:
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
  }, [monthData, selectedDate, viewSelected, yearData]);

  const handleHeaderActions = (action: headerActions) =>
    handleClickViewControls(
      action,
      viewSelected,
      selectedDate,
      handleChangeSelectedDate
    );

  useEffect(() => {
    createCalendarDate();
  }, [createCalendarDate, selectedDate, viewSelected]);

  return (
    <motion.div layout className={styles.container}>
      <Header onClickAction={handleHeaderActions} week={weekData} />

      {viewSelected === calendarViews.WEEK && (
        <WeekView week={weekData} onChangeDate={handleChangeSelectedDate} />
      )}
      {viewSelected === calendarViews.MONTH && (
        <MonthView month={monthData} onChangeDate={handleChangeSelectedDate} />
      )}
      {viewSelected === calendarViews.YEAR && (
        <YearView year={yearData} onChangeDate={handleChangeSelectedDate} />
      )}
    </motion.div>
  );
}
