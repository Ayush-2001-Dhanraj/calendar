// src/features/appSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { createSelector } from "reselect";
import { Event } from "../common/interfaces";
import { calendarViews } from "../common";

interface AppState {
  viewSelected: calendarViews;
  isDrawerOpen: boolean;
  drawerTop: number;
  drawerLeft: number;
  events: Event[];
  selectedDate: string;
  selectedHour: string;
  user: any;
}

const initialState: AppState = {
  viewSelected: calendarViews.WEEK,
  isDrawerOpen: false,
  drawerTop: 0,
  drawerLeft: 0,
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
  user: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setViewSelected: (
      state,
      action: PayloadAction<{
        view: calendarViews;
      }>
    ) => {
      state.viewSelected = action.payload.view;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
      state.drawerTop = 0;
      state.drawerLeft = 0;
    },
    openDrawer: (state, action) => {
      state.isDrawerOpen = true;
      state.drawerTop = action.payload.top || 0;
      state.drawerLeft = action.payload.left || 0;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
      state.drawerTop = 0;
      state.drawerLeft = 0;
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
    setUser: (state, action) => {
      state.user = action.payload.user;
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
  setViewSelected,
  setUser,
} = appSlice.actions;

export const getDrawerState = (state: RootState) => state.app.isDrawerOpen;
export const getViewSelected = (state: RootState) => state.app.viewSelected;
export const getSelectedHour = (state: RootState) => state.app.selectedHour;
export const getDrawerPosition = createSelector(
  [
    (state: RootState) => state.app.drawerTop,
    (state: RootState) => state.app.drawerLeft,
  ],
  (drawerTop, drawerLeft) => ({ top: drawerTop, left: drawerLeft })
);
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
export const getUser = (state: RootState) => state.app.user;

export default appSlice.reducer;
