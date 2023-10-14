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
