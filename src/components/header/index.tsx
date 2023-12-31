import React, { useEffect, useState } from "react";
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
  week,
}: HeaderProps) {
  const [headerText, setHeaderText] = useState<string>(
    `${monthHeads[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
  );

  useEffect(() => {
    switch (viewSelected) {
      case calendarViews.WEEK:
        if (week[0] && week[6])
          if (week[0].getMonth() !== week[6].getMonth())
            setHeaderText(
              `${monthHeads[week[0].getMonth()]} - ${
                monthHeads[week[6].getMonth()]
              }`
            );
          else setHeaderText(`${monthHeads[week[0].getMonth()]}`);
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
        {headerText}
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
