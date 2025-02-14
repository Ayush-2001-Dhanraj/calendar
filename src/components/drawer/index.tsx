import React, { useEffect, useRef, useState } from "react";
import styles from "./drawer.module.css";
import TimePicker from "../timePicker";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  getSelectedDate,
  setSelectedDate,
  getSelectedHour,
  closeDrawer,
  getUser,
  fetchEventsFromBackend,
} from "../../redux/appSlice";
import { motion } from "framer-motion";
import { convertTo24Hour } from "../../utils/timeHelpers";
import UserService from "../../services/UserServices";
import toast from "react-hot-toast";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  top?: number;
  left?: number;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, top, left }) => {
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const drawerRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector(getUser);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const formattedDate: string = selectedDate.toLocaleDateString(
      "en-CA",
      options
    ); // "en-CA" ensures YYYY-MM-DD format

    const result = await UserService.createEvent(user.id, {
      ...event,
      eventDate: formattedDate,
      eventTime: convertTo24Hour(event.time),
    });

    if (!result.event) {
      toast.error("Something went wrong!");
    } else {
      dispatch(fetchEventsFromBackend(user.id));
      setEvent(eventDefault);
      dispatch(closeDrawer());
    }
  };

  useEffect(() => {
    if (userSelectedHour) {
      let hr: string | number = parseInt(userSelectedHour.split(":")[0]);
      hr = hr < 10 ? "0" + hr : hr;
      const min = userSelectedHour.split(":")[1].split(" ")[0];
      const per = userSelectedHour.split(":")[1].split(" ")[1];
      setSelectedHour(hr as string);
      setSelectedMinute(min);
      setSelectedPeriod(per);
      setEvent((preV) => ({ ...preV, time: `${hr}:${min} ${per}` }));
    }
  }, [userSelectedHour]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      ref={drawerRef}
      className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
      style={{
        top: isOpen
          ? top &&
            window.innerHeight - top > (drawerRef.current?.clientHeight || 200)
            ? top + "px"
            : `calc(100vh - ${(drawerRef.current?.clientHeight || 0) + 10}px)`
          : "100%",
        left:
          left && window.innerWidth - left > 310
            ? left + "px"
            : "calc(100vw - 310px)",
      }}
    >
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
    </motion.div>
  );
};

export default Drawer;
