import React from "react";
import styles from "./week.module.css";
import { WeekProps } from "../../../common/interfaces";
import DayCell from "../dayCell";
import { monthHeads } from "../../../common";
import { motion } from "framer-motion";

export default function Week({ week, onChangeDate, heightAuto }: WeekProps) {
  return (
    <motion.div className={styles.week}>
      {week.map((dayOfWeek, index) => (
        <DayCell
          key={`Day cel ${index} ${
            monthHeads[dayOfWeek.getMonth()]
          } ${dayOfWeek.getDate()}`}
          dayOfWeek={dayOfWeek}
          onChangeDate={onChangeDate}
          heightAuto={heightAuto}
        />
      ))}
    </motion.div>
  );
}
