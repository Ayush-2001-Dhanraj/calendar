import { Dispatch, SetStateAction } from "react";
import { calendarViews } from ".";

export interface MonthProps {
  selectedDate: Date;
  onChangeDate: (arg0: Date) => void;
  calendarData: Array<Array<Date>>;
}

export interface WeekProps {
  week: Array<Date>;
  selectedDate: Date;
  onChangeDate: (arg0: Date) => void;
}

export interface DayCellProps {
  selectedDate: Date;
  dayOfWeek: Date;
  onChangeDate: (arg0: Date) => void;
}

export interface HeaderProps {
  selectedDate: Date;
  onClickNext: () => void;
  onClickToday: () => void;
  onClickBack: () => void;
  setViewSelected: Dispatch<SetStateAction<calendarViews>>;
  viewSelected: calendarViews;
}
