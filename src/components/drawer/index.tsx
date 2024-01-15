import React, { useState } from "react";
import styles from "./drawer.module.css";
import TimePicker from "../timePicker";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  const [event, setEvent] = useState({
    title: "",
    date: "",
    description: "",
    time: `${selectedHour}:${selectedMinute} ${selectedPeriod}`,
  });

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
    } else setEvent((preV) => ({ ...preV, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(event);
  };

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
            value={event.date}
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
