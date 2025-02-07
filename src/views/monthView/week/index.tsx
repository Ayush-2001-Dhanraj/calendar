import React from "react";
import styles from "./week.module.css";
import { WeekProps } from "../../../common/interfaces";
import DayCell from "../dayCell";
import { monthHeads } from "../../../common";
import { motion } from "framer-motion";

export default function Week({ week, heightAuto, currentMonth }: WeekProps) {
  return (
    <motion.div className={styles.week}>
      {week.map((dayOfWeek, index) => (
        <DayCell
          key={`Day cel ${index} ${
            monthHeads[dayOfWeek.getMonth()]
          } ${dayOfWeek.getDate()}`}
          dayOfWeek={dayOfWeek}
          heightAuto={heightAuto}
          currentMonth={currentMonth}
        />
      ))}
    </motion.div>
  );
}
