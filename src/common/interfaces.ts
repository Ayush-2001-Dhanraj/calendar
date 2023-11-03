import { Dispatch, SetStateAction } from "react";
import { calendarViews } from ".";

export interface CommonViewProps {
  selectedDate: Date;
  onChangeDate: (arg0: Date) => void;
}

export interface MonthProps extends CommonViewProps {
  month: Array<Array<Date>>;
}

export interface WeekProps extends CommonViewProps {
  week: Array<Date>;
}

export interface YearProps extends CommonViewProps {
  year: Array<Array<Array<Date>>>;
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
