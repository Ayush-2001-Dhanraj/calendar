import React from "react";
import styles from "./weekHeads.module.css";
import { calendarViews, weekHeads } from "../../common";

interface WeekHeadsProps {
  view?: calendarViews;
}

export default function WeekHeads({ view }: WeekHeadsProps) {
  return (
    <div className={styles.week}>
      {weekHeads.map((head: string) => (
        <div
          key={head}
          className={`${styles.headsOfWeek} ${
            view === calendarViews.WEEK ? styles.weekView : ""
          }`}
        >
          {head}
        </div>
      ))}
    </div>
  );
}
