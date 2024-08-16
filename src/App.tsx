import React, { useEffect } from "react";
import Container from "./components/container";
import styles from "./App.module.css";
import { useAppDispatch, useAppSelector } from "./redux/store";
import {
  setSelectedHour,
  getDrawerState,
  getDrawerPosition,
  toggleDrawer,
} from "./redux/appSlice";
import Drawer from "./components/drawer";

function App() {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector(getDrawerState);
  const drawerPosition = useAppSelector(getDrawerPosition);

  const handleAddEvent = () => {
    dispatch(toggleDrawer());
  };

  useEffect(() => {
    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    } as Intl.DateTimeFormatOptions;

    const timeSlot = new Intl.DateTimeFormat("en-US", options).format(
      new Date()
    );
    const [hour, minutes, period] = timeSlot.split(/:| /);

    // Round minutes to the nearest 15
    const roundedMinutes = Math.round(parseInt(minutes, 10) / 15) * 15;

    // Format the rounded time
    const roundedTime = `${hour}:${roundedMinutes
      .toString()
      .padStart(2, "0")} ${period}`;

    dispatch(setSelectedHour({ hour: roundedTime }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <Container />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleAddEvent}
        top={drawerPosition.top}
        left={drawerPosition.left}
      />
    </div>
  );
}

export default App;
