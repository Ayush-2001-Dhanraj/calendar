import React, { useEffect } from "react";
import styles from "./yearView.module.css";
import { YearProps } from "../../common/interfaces";
import MonthView from "../monthView";

export default function YearView({
  year,
  selectedDate,
  onChangeDate,
}: YearProps) {
  useEffect(() => {
    // set page title
    document.title = "Calendar - Year";
  }, []);

  return (
    <div className={styles.yearView}>
      {year.map((month, index) => {
        return (
          <div
            className={styles.monthContainer}
            key={`year ${year[0][0][0].getFullYear()} month ${index + 1}`}
          >
            <MonthView
              month={month}
              selectedDate={selectedDate}
              onChangeDate={onChangeDate}
              showMonth
              heightAuto
            />
          </div>
        );
      })}
    </div>
  );
}
