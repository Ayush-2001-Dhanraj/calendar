import React, { memo } from "react";
import styles from "./month.module.css";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import { changeMonthControls, monthHeads, weekHeads } from "../../common/index";
import { MonthProps } from "../../common/interfaces";
import Week from "./week";

function Month({ selectedDate, onChangeDate, calendarData }: MonthProps) {
  const handleChangeMonth = (control: changeMonthControls) => {
    const newMonth =
      control === changeMonthControls.NEXT
        ? selectedDate.getMonth() + 1
        : selectedDate.getMonth() - 1;
    const newSelectedDate = new Date(selectedDate.getFullYear(), newMonth, 1);
    onChangeDate(newSelectedDate);
  };

  const onClickNext = () => handleChangeMonth(changeMonthControls.NEXT);
  const onClickBack = () => handleChangeMonth(changeMonthControls.BACK);

  const MonthHeadSection = (
    <div className={styles.monthHead}>
      <button onClick={onClickBack} className={styles.monthChangers}>
        <HiOutlineArrowLeft />
      </button>
      {`${monthHeads[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
      <button onClick={onClickNext} className={styles.monthChangers}>
        <HiOutlineArrowRight />
      </button>
    </div>
  );

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
      {MonthHeadSection}
      {WeekHeadsSection}
      <MonthSection />
    </div>
  );
}

export default memo(Month);
