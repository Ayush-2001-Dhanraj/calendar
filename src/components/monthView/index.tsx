import React, { memo } from "react";
import styles from "./month.module.css";
import { weekHeads } from "../../common/index";
import { MonthProps } from "../../common/interfaces";
import Week from "./week";

function Month({ selectedDate, onChangeDate, calendarData }: MonthProps) {
  const WeekHeadsSection = (
    <div className={styles.week}>
      {weekHeads.map((head: string) => (
        <div key={head} className={styles.headsOfWeek}>
          {head}
        </div>
      ))}
    </div>
  );

  const MonthSection = () => {
    return (
      <>
        {calendarData.map((week, index) => (
          <Week
            key={`week ${index + 1}`}
            week={week}
            selectedDate={selectedDate}
            onChangeDate={onChangeDate}
          />
        ))}
      </>
    );
  };

  return (
    <div className={styles.month}>
      {WeekHeadsSection}
      <MonthSection />
    </div>
  );
}

export default memo(Month);
