// src/features/appSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { createSelector } from "reselect";

interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
}

interface AppState {
  isDrawerOpen: boolean;
  events: Event[];
  selectedDate: string;
}

const initialState: AppState = {
  isDrawerOpen: false,
  events: [],
  selectedDate: new Date().toISOString(),
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
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
  },
});

export const { toggleDrawer, addEvent, setSelectedDate } = appSlice.actions;
export const getDrawerState = (state: RootState) => state.app.isDrawerOpen;

export const getEvents = createSelector(
  [(state: RootState) => state.app.events],
  (events) =>
    events.map((e) => ({
      ...e,
      date: new Date(e.date),
    }))
);

export const getSelectedDate = createSelector(
  [(state: RootState) => state.app.selectedDate],
  (selectedDate) => new Date(selectedDate)
);

export default appSlice.reducer;
