import React, { useEffect } from "react";
import styles from "./yearView.module.css";
import { YearProps } from "../../common/interfaces";
import MonthView from "../monthView";
import AnimationContainer from "../../components/AnimationContainer";
import dogSitting from "../../assets/animations/dog_sitting.json";
import brightButterfly from "../../assets/animations/brightButterfly.json";

export default function YearView({ year }: YearProps) {
  useEffect(() => {
    // set page title
    document.title = "Calendar - Year";
  }, []);

  return (
    <>
      <div className={styles.yearView}>
        {year.map((month, index) => {
          return (
            <div
              className={styles.monthContainer}
              key={`year ${year[0][0][0].getFullYear()} month ${index + 1}`}
            >
              <MonthView month={month} heightAuto />
            </div>
          );
        })}
      </div>

      <>
        <div className={`${styles.animationContainer} ${styles.butterFly}`}>
          <AnimationContainer
            animationData={brightButterfly}
            height={250}
            width={250}
          />
        </div>
        <div className={`${styles.animationContainer} ${styles.dogSitting}`}>
          <AnimationContainer
            animationData={dogSitting}
            height={500}
            width={800}
          />
        </div>
      </>
    </>
  );
}
