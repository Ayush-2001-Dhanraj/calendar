import styles from "./dayCell.module.css";
import { CalendarEvent, DayCellProps } from "../../../common/interfaces";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  getEvents,
  getSelectedDate,
  getSelectedEvent,
  getViewSelected,
  openDrawer,
  setSelectedDate,
  setSelectedEventID,
} from "../../../redux/appSlice";
import { calendarViews } from "../../../common";
import { motion } from "framer-motion";
import { FaDotCircle } from "react-icons/fa";

export default function DayCell({
  dayOfWeek,
  heightAuto,
  currentMonth,
}: DayCellProps) {
  const dispatch = useAppDispatch();

  const viewSelected = useAppSelector(getViewSelected);
  const allEvents = useAppSelector(getEvents);
  const selectedDate = useAppSelector(getSelectedDate);
  const selectedEventID = useAppSelector(getSelectedEvent);

  const isToday =
    dayOfWeek.getMonth() === new Date().getMonth() &&
    dayOfWeek.getMonth() === currentMonth &&
    dayOfWeek.getDate() === new Date().getDate() &&
    dayOfWeek.getFullYear() === new Date().getFullYear();
  const isSelectedDate =
    dayOfWeek.getMonth() === selectedDate.getMonth() &&
    dayOfWeek.getDate() === selectedDate.getDate() &&
    dayOfWeek.getFullYear() === selectedDate.getFullYear();
  const isOutOfMonth =
    dayOfWeek.getMonth() !== selectedDate.getMonth() && !heightAuto;

  const dayCellStyles = `${styles.dayOfWeek} ${
    isOutOfMonth ? styles.daysNotOfCurrentMonth : ""
  } ${isSelectedDate ? styles.selectedDayOfWeek : ""} ${
    isToday ? styles.today : ""
  } ${heightAuto ? styles.heightAuto : styles.height100}`;

  const relevantEvents = allEvents.filter(
    (e) =>
      e.event_date.getDate() === dayOfWeek.getDate() &&
      e.event_date.getMonth() === dayOfWeek.getMonth() &&
      e.event_date.getFullYear() === dayOfWeek.getFullYear()
  );

  const handleTimeBlockClick = (date: Date, x: number, y: number) => {
    if (selectedEventID) {
      dispatch(setSelectedEventID({ eventID: null }));
    }
    dispatch(setSelectedDate({ newDate: date.toISOString() }));
    dispatch(openDrawer({ top: y, left: x }));
  };

  const handleClickEvent = (eve: CalendarEvent, x: number, y: number) => {
    dispatch(
      setSelectedEventID({
        eventID: eve.id,
      })
    );
    dispatch(setSelectedDate({ newDate: eve.event_date.toISOString() }));
    dispatch(openDrawer({ top: y, left: x }));
  };

  return (
    <div
      className={dayCellStyles}
      onClick={(e) => {
        dispatch(setSelectedDate({ newDate: dayOfWeek.toISOString() }));
        handleTimeBlockClick(dayOfWeek, e.pageX, e.pageY);
      }}
    >
      <div>{dayOfWeek.getDate()}</div>
      {viewSelected === calendarViews.MONTH && (
        <>
          {relevantEvents.map((eve: CalendarEvent, index) => (
            <motion.p
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 1.1 }}
              key={`event_time - ${index} event - date:${eve.event_date.toISOString()} time:${
                eve.event_time
              } title:${eve.title}`}
              className={`${styles.event} ${isToday && styles.altEvent}`}
              onClick={(e) => {
                e.stopPropagation();
                handleClickEvent(eve, e.pageX, e.pageY);
              }}
            >
              {eve.title}
            </motion.p>
          ))}
        </>
      )}
      {viewSelected === calendarViews.YEAR && !!relevantEvents.length && (
        <FaDotCircle size={10} className={styles.dotIcon} />
      )}
    </div>
  );
}
