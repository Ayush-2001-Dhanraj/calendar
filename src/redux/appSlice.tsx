// src/features/appSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AppState {
  isDrawerOpen: boolean;
  value: number;
}

const initialState: AppState = {
  isDrawerOpen: false,
  value: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { toggleDrawer } = appSlice.actions;
export const getDrawerState = (state: RootState) => state.app.isDrawerOpen;

export default appSlice.reducer;
