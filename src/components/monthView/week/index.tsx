import React from "react";
import styles from "./week.module.css";
import { WeekProps } from "../../../common/interfaces";
import DayCell from "../dayCell";
import { monthHeads } from "../../../common";

export default function Week({ week, selectedDate, onChangeDate }: WeekProps) {
  return (
    <div className={styles.week}>
      {week.map((dayOfWeek, index) => (
        <DayCell
          key={`Day cel ${index} ${
            monthHeads[dayOfWeek.getMonth()]
          } ${dayOfWeek.getDate()}`}
          dayOfWeek={dayOfWeek}
          selectedDate={selectedDate}
          onChangeDate={onChangeDate}
        />
      ))}
    </div>
  );
}
