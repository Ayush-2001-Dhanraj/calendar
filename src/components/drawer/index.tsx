import React, { useEffect, useState } from "react";
import styles from "./drawer.module.css";
import TimePicker from "../timePicker";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  getSelectedDate,
  setSelectedDate,
  addEvent,
  getSelectedHour,
} from "../../redux/appSlice";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  const selectedDate = useAppSelector(getSelectedDate);
  const userSelectedHour = useAppSelector(getSelectedHour);
  const dispatch = useAppDispatch();

  const eventDefault = {
    title: "",
    description: "",
    time: `${selectedHour}:${selectedMinute} ${selectedPeriod}`,
  };

  const [event, setEvent] = useState(eventDefault);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (["hours", "minutes", "period"].includes(e.target.name)) {
      let time = "";
      switch (e.target.name) {
        case "hours":
          setSelectedHour(e.target.value);
          time = `${e.target.value}:${selectedMinute} ${selectedPeriod}`;
          break;
        case "minutes":
          setSelectedMinute(e.target.value);
          time = `${selectedHour}:${e.target.value} ${selectedPeriod}`;
          break;
        case "period":
          setSelectedPeriod(e.target.value);
          time = `${selectedHour}:${selectedMinute} ${e.target.value}`;
          break;

        default:
          break;
      }
      setEvent((preV) => ({ ...preV, time }));
    } else if (e.target.name === "date") {
      dispatch(setSelectedDate({ newDate: e.target.value }));
    } else setEvent((preV) => ({ ...preV, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvent(eventDefault);
    dispatch(addEvent({ ...event, date: selectedDate.toISOString() }));
  };

  useEffect(() => {
    let hr: string | number = parseInt(userSelectedHour.split(":")[0]);
    const min = userSelectedHour.split(":")[1];
    const period = parseInt(userSelectedHour.split(":")[0]) > 11 ? "PM" : "AM";
    hr = hr > 12 ? hr - 12 : hr;
    hr = hr < 10 ? "0" + hr : hr;
    setSelectedHour(hr as string);
    setSelectedMinute(min);
    setSelectedPeriod(period);
    const time = `${hr}:${min} ${period}`;
    setEvent((preV) => ({ ...preV, time }));
  }, [userSelectedHour]);

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>

      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            placeholder="Add Title"
            onChange={handleChange}
            name="title"
            value={event.title}
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="haha"
            name="date"
            onChange={handleChange}
            value={selectedDate.toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            required
          />
        </div>
        <div className={styles.dntSection}>
          <TimePicker
            onChange={handleChange}
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
            selectedPeriod={selectedPeriod}
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Add Description"
            onChange={handleChange}
            value={event.description}
          />
        </div>
        <button type="submit" className={`${styles.dateBtn} ${styles.saveBtn}`}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Drawer;
