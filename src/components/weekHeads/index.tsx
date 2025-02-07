import React from "react";
import styles from "./weekHeads.module.css";
import { calendarViews, weekHeads } from "../../common";
import { useAppSelector } from "../../redux/store";
import { getViewSelected } from "../../redux/appSlice";

export default function WeekHeads() {
  const selectedView = useAppSelector(getViewSelected);
  return (
    <div className={styles.week}>
      {weekHeads.map((head: string) => (
        <div
          key={head}
          className={`${styles.headsOfWeek} ${
            selectedView === calendarViews.YEAR ? styles.yearView : ""
          }`}
        >
          {head}
        </div>
      ))}
    </div>
  );
}
