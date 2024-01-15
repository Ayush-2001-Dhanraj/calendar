// src/features/appSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { createSelector } from "reselect";

interface AppState {
  isDrawerOpen: boolean;
  events: {
    title: string;
    description: string;
    date: string;
    time: string;
  }[];
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
    addEvent: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        date: string;
        time: string;
      }>
    ) => {
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
export const getEvents = (state: RootState) => state.app.events;
export const getSelectedDate = createSelector(
  [(state: RootState) => state.app.selectedDate],
  (selectedDate) => new Date(selectedDate)
);

export default appSlice.reducer;
