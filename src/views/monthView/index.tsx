import React, { memo, useEffect } from "react";
import { MonthProps } from "../../common/interfaces";
import styles from "./monthView.module.css";

import Week from "./week";
import WeekHeads from "../../components/weekHeads";
import { calendarViews, monthHeads } from "../../common";
import { motion } from "framer-motion";
import { useAppSelector } from "../../redux/store";
import { getViewSelected } from "../../redux/appSlice";

const MonthView = ({ month, heightAuto }: MonthProps) => {
  const viewSelected = useAppSelector(getViewSelected);

  const MonthSection = () => {
    return (
      <>
        {month.map((week, index) => (
          <Week key={`week ${index + 1}`} week={week} heightAuto={heightAuto} />
        ))}
      </>
    );
  };

  useEffect(() => {
    // set page title
    document.title = "Calendar - Month";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: viewSelected === calendarViews.YEAR ? 2 : 1 }}
      className={styles.monthView}
    >
      {viewSelected === calendarViews.YEAR && month[2] && month[2][6] && (
        <div className={styles.monthTile}>
          {monthHeads[month[2][6].getMonth()]}
        </div>
      )}
      <WeekHeads />
      <MonthSection />
    </motion.div>
  );
};

export default memo(MonthView);
