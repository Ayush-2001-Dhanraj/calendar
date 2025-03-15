import React, { useCallback, useEffect } from "react";
import Container from "./components/container";
import styles from "./App.module.css";
import { useAppDispatch, useAppSelector } from "./redux/store";
import {
  setSelectedHour,
  getDrawerState,
  getDrawerPosition,
  toggleDrawer,
  setUser,
  fetchEventsFromBackend,
  getProfilePageState,
  toggleProfile,
  getUser,
} from "./redux/appSlice";
import Drawer from "./components/drawer";
import ProtectedComp from "./components/protectedComp";
import toast, { Toaster } from "react-hot-toast";
import UserService from "./services/UserServices";
import ProfileModel from "./components/ProfileModel";

function App() {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector(getDrawerState);
  const drawerPosition = useAppSelector(getDrawerPosition);
  const isProfileOpen = useAppSelector(getProfilePageState);
  const user = useAppSelector(getUser);

  const handleAddEvent = () => {
    dispatch(toggleDrawer());
  };

  const getCurrentUser = useCallback(async () => {
    if (user && user.id) {
      const response = await UserService.getCurrentUser(user.id);
      console.log(response);
      if (response.user) {
        toast.success("Welcome Back!");
        dispatch(setUser({ user: response.user }));
        dispatch(fetchEventsFromBackend(response.user.id));
      }
    }
  }, []);

  const toggleProfileModel = () => {
    dispatch(toggleProfile());
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

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
      <ProtectedComp>
        <Container />
        <Drawer
          isOpen={isDrawerOpen}
          onClose={handleAddEvent}
          top={drawerPosition.top}
          left={drawerPosition.left}
        />
        <ProfileModel isOpen={isProfileOpen} onClose={toggleProfileModel} />
      </ProtectedComp>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
