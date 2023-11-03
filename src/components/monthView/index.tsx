import React, { memo } from "react";
import WeekHeads from "../weekHeads";
import { MonthProps } from "../../common/interfaces";

import Week from "./week";

function Month({ selectedDate, onChangeDate, month }: MonthProps) {
  const MonthSection = () => {
    return (
      <>
        {month.map((week, index) => (
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
    <>
      <WeekHeads />
      <MonthSection />
    </>
  );
}

export default memo(Month);
