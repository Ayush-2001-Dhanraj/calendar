import { ReactNode } from "react";
import { headerActions } from ".";

export interface MonthProps {
  month: Array<Array<Date>>;
  heightAuto?: boolean;
}

export interface WeekProps {
  week: Array<Date>;
  heightAuto?: boolean;
  currentMonth?: number
}

export interface YearProps {
  year: Array<Array<Array<Date>>>;
}

export interface DayCellProps {
  dayOfWeek: Date;
  heightAuto?: boolean;
  currentMonth?: number;
}

export interface HeaderProps {
  onClickAction: (action: headerActions) => void;
  week: Array<Date>;
}

export interface Event {
  title: string;
  description: string;
  event_date: string;
  event_time: string;
}
export interface CalendarEvent {
  id?: string,
  title: string;
  description: string;
  event_date: Date;
  event_time: string;
}

export interface BottomNavProps {
  onClickAction: (action: headerActions) => void;
}

export interface ProtectedCompProps {
  children: ReactNode;
}