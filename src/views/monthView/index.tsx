import React, { memo, useEffect } from "react";
import { MonthProps } from "../../common/interfaces";
import styles from "./monthView.module.css";

import Week from "./week";
import WeekHeads from "../../components/weekHeads";
import { monthHeads } from "../../common";
import { motion } from "framer-motion";

function MonthView({ onChangeDate, month, showMonth, heightAuto }: MonthProps) {
  const MonthSection = () => {
    useEffect(() => {
      // set page title
      document.title = "Calendar - Month";
    }, []);
    return (
      <>
        {month.map((week, index) => (
          <Week
            key={`week ${index + 1}`}
            week={week}
            onChangeDate={onChangeDate}
            heightAuto={heightAuto}
          />
        ))}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {showMonth && month[2] && month[2][6] && (
        <div className={styles.monthTile}>
          {monthHeads[month[2][6].getMonth()]}
        </div>
      )}
      <WeekHeads />
      <MonthSection />
    </motion.div>
  );
}

export default memo(MonthView);
