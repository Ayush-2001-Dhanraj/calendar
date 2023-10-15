import React from "react";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import styles from "./header.module.css";
import { calendarViews, monthHeads } from "../../common";
import { HeaderProps } from "../../common/interfaces";

export default function Header({
  selectedDate,
  onClickNext,
  onClickBack,
  viewSelected,
  setViewSelected,
  onClickToday,
}: HeaderProps) {
  return (
    <div className={styles.monthHead}>
      <button
        className={`${styles.btns} ${styles.outline}`}
        onClick={onClickToday}
      >
        Today
      </button>
      <div className={styles.actions}>
        <button onClick={onClickBack} className={styles.btns}>
          <HiOutlineArrowLeft />
        </button>
        {`${monthHeads[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
        <button onClick={onClickNext} className={styles.btns}>
          <HiOutlineArrowRight />
        </button>
      </div>
      <select
        className={`${styles.btns} ${styles.outline} ${styles.select}`}
        value={viewSelected}
        onChange={(e) => setViewSelected(e.target.value as calendarViews)}
      >
        {Object.keys(calendarViews).map((key) => (
          <option key={key} value={key}>
            {calendarViews[key as calendarViews]}
          </option>
        ))}
      </select>
    </div>
  );
}
