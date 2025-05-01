import React, { memo, useEffect } from "react";
import { MonthProps } from "../../common/interfaces";
import styles from "./monthView.module.css";

import Week from "./week";
import WeekHeads from "../../components/weekHeads";
import { calendarViews, monthHeads } from "../../common";
import { motion } from "framer-motion";
import { useAppSelector } from "../../redux/store";
import { getViewSelected } from "../../redux/appSlice";
import treeImage from "../../assets/images/tree_1.png";
import rockImage from "../../assets/images/rock_1.png";
import AnimationContainer from "../../components/AnimationContainer";
import brightButterfly from "../../assets/animations/brightButterfly.json";
import blueButterfly from "../../assets/animations/blueButterfly.json";

const MonthView = ({ month, heightAuto }: MonthProps) => {
  const viewSelected = useAppSelector(getViewSelected);

  const MonthSection = () => {
    return (
      <>
        {month.map((week, index) => (
          <Week
            key={`week ${index + 1}`}
            week={week}
            heightAuto={heightAuto}
            currentMonth={month[2][6].getMonth()}
          />
        ))}
      </>
    );
  };

  useEffect(() => {
    // set page title
    document.title = "Calendar - Month";
  }, []);

  return (
    <>
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

      {viewSelected === calendarViews.MONTH && (
        <>
          <div className={styles.sideLandscape}>
            <img src={treeImage} className={styles.sideImage} />
          </div>
          <div className={styles.rockImgContainer}>
            <img src={rockImage} className={styles.rockImage} />
          </div>
          <div className={`${styles.animationContainer} ${styles.butterfly1}`}>
            <AnimationContainer animationData={brightButterfly} />
          </div>
          <div className={`${styles.animationContainer} ${styles.butterfly2}`}>
            <AnimationContainer
              animationData={brightButterfly}
              height={250}
              width={250}
            />
          </div>
          <div className={`${styles.animationContainer} ${styles.butterfly3}`}>
            <AnimationContainer
              animationData={blueButterfly}
              height={200}
              width={200}
            />
          </div>
        </>
      )}
    </>
  );
};

export default memo(MonthView);
