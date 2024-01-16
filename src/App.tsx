import React, { useEffect } from "react";
import Container from "./components/container";
import styles from "./App.module.css";
import { useAppDispatch } from "./redux/store";
import { setSelectedHour } from "./redux/appSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    } as Intl.DateTimeFormatOptions;

    const timeSlot = new Intl.DateTimeFormat("en-US", options).format(
      new Date()
    );
    const [hour, minutes] = timeSlot.split(/:| /);

    // Round minutes to the nearest 15
    const roundedMinutes = Math.round(parseInt(minutes, 10) / 15) * 15;

    // Format the rounded time
    const roundedTime = `${hour}:${roundedMinutes.toString().padStart(2, "0")}`;

    dispatch(setSelectedHour({ hour: roundedTime }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <Container />
    </div>
  );
}

export default App;
