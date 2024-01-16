// src/features/appSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { createSelector } from "reselect";
import { Event } from "../common/interfaces";

interface AppState {
  isDrawerOpen: boolean;
  events: Event[];
  selectedDate: string;
  selectedHour: string;
}

const initialState: AppState = {
  isDrawerOpen: false,
  events: [
    {
      date: "Mon Jan 15 2024 00:00:00 GMT+0530",
      title: "Tea with Katy",
      description: "",
      time: "12:00 AM",
    },
    {
      date: "wed Jan 17 2024 00:00:00 GMT+0530",
      title: "Mother Goose Help me!",
      description: "",
      time: "09:30 AM",
    },
    {
      date: "Mon Jan 16 2024 00:00:00 GMT+0530",
      title: "Brunch on sofa with Amanda",
      description: "",
      time: "12:45 AM",
    },
  ],
  selectedDate: new Date().toISOString(),
  selectedHour: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      const { title, description, date, time } = action.payload;
      state.events.push({ title, description, date, time });
    },
    setSelectedDate: (
      state,
      action: PayloadAction<{
        newDate: string;
      }>
    ) => {
      const { newDate } = action.payload;
      state.selectedDate = newDate;
    },
    setSelectedHour: (state, action) => {
      state.selectedHour = action.payload.hour;
    },
  },
});

export const {
  toggleDrawer,
  addEvent,
  setSelectedDate,
  setSelectedHour,
  openDrawer,
  closeDrawer,
} = appSlice.actions;
export const getDrawerState = (state: RootState) => state.app.isDrawerOpen;

export const getEvents = createSelector(
  [(state: RootState) => state.app.events],
  (events) =>
    events.map((e) => ({
      ...e,
      date: new Date(e.date),
    }))
);
export const getSelectedHour = (state: RootState) => state.app.selectedHour;

export const getSelectedDate = createSelector(
  [(state: RootState) => state.app.selectedDate],
  (selectedDate) => new Date(selectedDate)
);

export default appSlice.reducer;
