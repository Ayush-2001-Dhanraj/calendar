// src/features/appSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AppState {
  isDrawerOpen: boolean;
  events: {
    title: string;
    description: string;
    date: string;
    time: string;
  }[];
}

const initialState: AppState = {
  isDrawerOpen: false,
  events: [],
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
  },
});

export const { toggleDrawer, addEvent } = appSlice.actions;
export const getDrawerState = (state: RootState) => state.app.isDrawerOpen;

export default appSlice.reducer;
