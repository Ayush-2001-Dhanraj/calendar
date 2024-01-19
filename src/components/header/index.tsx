import React, { useEffect, useState } from "react";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import styles from "./header.module.css";
import { calendarViews, headerActions, monthHeads } from "../../common";
import { HeaderProps } from "../../common/interfaces";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  getSelectedDate,
  getViewSelected,
  setViewSelected,
} from "../../redux/appSlice";

export default function Header({ onClickAction, week }: HeaderProps) {
  const selectedDate = useAppSelector(getSelectedDate);

  const [headerText, setHeaderText] = useState<string>(
    `${monthHeads[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
  );

  const dispatch = useAppDispatch();
  const viewSelected = useAppSelector(getViewSelected);

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(setViewSelected({ view: e.target.value as calendarViews }));

  useEffect(() => {
    switch (viewSelected) {
      case calendarViews.WEEK:
        if (week[0] && week[6])
          if (week[0].getMonth() !== week[6].getMonth()) {
            if (week[0].getFullYear() !== week[6].getFullYear()) {
              setHeaderText(
                `${monthHeads[week[0].getMonth()]} ${week[0].getFullYear()} - ${
                  monthHeads[week[6].getMonth()]
                } ${week[6].getFullYear()}`
              );
            } else {
              setHeaderText(
                `${monthHeads[week[0].getMonth()]} - ${
                  monthHeads[week[6].getMonth()]
                } ${week[6].getFullYear()}`
              );
            }
          } else
            setHeaderText(
              `${monthHeads[week[0].getMonth()]} ${week[0].getFullYear()}`
            );
        break;
      case calendarViews.MONTH:
        setHeaderText(
          `${monthHeads[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
        );
        break;
      case calendarViews.YEAR:
        setHeaderText(`${selectedDate.getFullYear()}`);
        break;

      default:
        break;
    }
  }, [selectedDate, viewSelected, week]);

  return (
    <motion.div layout className={styles.monthHead}>
      <button
        className={`${styles.btns} ${styles.outline}`}
        onClick={() => onClickAction(headerActions.TODAY)}
      >
        Today
      </button>
      <motion.div layout className={styles.actions}>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onClickAction(headerActions.BACK)}
          className={styles.btns}
        >
          <HiOutlineArrowLeft size={25} />
        </motion.button>
        {headerText}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onClickAction(headerActions.NEXT)}
          className={styles.btns}
        >
          <HiOutlineArrowRight size={25} />
        </motion.button>
      </motion.div>

      <select
        className={`${styles.btns} ${styles.outline} ${styles.select}`}
        value={viewSelected}
        onChange={handleViewChange}
      >
        {Object.keys(calendarViews).map((key) => (
          <option key={key} value={key}>
            {calendarViews[key as calendarViews]}
          </option>
        ))}
      </select>
    </motion.div>
  );
}
