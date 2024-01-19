import { headerActions } from ".";

export interface CommonViewProps {
  onChangeDate: (arg0: Date) => void;
}

export interface MonthProps extends CommonViewProps {
  month: Array<Array<Date>>;
  showMonth?: boolean;
  heightAuto?: boolean;
}

export interface WeekProps extends CommonViewProps {
  week: Array<Date>;
  heightAuto?: boolean;
}

export interface YearProps extends CommonViewProps {
  year: Array<Array<Array<Date>>>;
}

export interface DayCellProps {
  dayOfWeek: Date;
  onChangeDate: (arg0: Date) => void;
  heightAuto?: boolean;
}

export interface HeaderProps {
  onClickAction: (action: headerActions) => void;
  week: Array<Date>;
}

export interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
}
