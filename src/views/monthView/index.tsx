import React, { memo } from "react";
import { MonthProps } from "../../common/interfaces";
import styles from "./monthView.module.css";

import Week from "./week";
import WeekHeads from "../../components/weekHeads";
import { monthHeads } from "../../common";

function MonthView({
  selectedDate,
  onChangeDate,
  month,
  showMonth,
  heightAuto,
}: MonthProps) {
  const MonthSection = () => {
    return (
      <>
        {month.map((week, index) => (
          <Week
            key={`week ${index + 1}`}
            week={week}
            selectedDate={selectedDate}
            onChangeDate={onChangeDate}
            heightAuto={heightAuto}
          />
        ))}
      </>
    );
  };

  return (
    <>
      {showMonth && month[2] && month[2][6] && (
        <div className={styles.monthTile}>
          {monthHeads[month[2][6].getMonth()]}
        </div>
      )}
      <WeekHeads />
      <MonthSection />
    </>
  );
}

export default memo(MonthView);
