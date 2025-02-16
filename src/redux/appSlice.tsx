// src/features/appSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { createSelector } from "reselect";
import { Event } from "../common/interfaces";
import { calendarViews } from "../common";
import UserService from "../services/UserServices";

export const fetchEventsFromBackend = createAsyncThunk<
  Event[], // Return type
  string, // Argument type (userID)
  { rejectValue: string } // Rejection type
>("app/fetchEvents", async (userID, { rejectWithValue }) => {
  try {
    const events = await UserService.getAllEvents(userID);
    return events.events;
  } catch (error) {
    return rejectWithValue("Failed to fetch events");
  }
});

interface AppState {
  viewSelected: calendarViews;
  isDrawerOpen: boolean;
  drawerTop: number;
  drawerLeft: number;
  events: Event[];
  selectedDate: string;
  selectedHour: string;
  selectedEventID: string | null;
  user: any;
}

const initialState: AppState = {
  viewSelected: calendarViews.MONTH,
  isDrawerOpen: false,
  drawerTop: 0,
  drawerLeft: 0,
  events: [],
  selectedDate: new Date().toISOString(),
  selectedHour: "",
  selectedEventID: null,
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
    fetchLatestEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
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
    setSelectedEventID: (state, action) => {
      state.selectedEventID = action.payload.eventID;
    },
    resetState: (state) => {
      Object.assign(state, initialState); // Reset state to initial values
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsFromBackend.pending, (state) => {
        // Optional: Handle loading state if needed
      })
      .addCase(fetchEventsFromBackend.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(fetchEventsFromBackend.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const {
  toggleDrawer,
  fetchLatestEvents,
  setSelectedDate,
  setSelectedHour,
  openDrawer,
  closeDrawer,
  setViewSelected,
  setUser,
  resetState,
  setSelectedEventID,
} = appSlice.actions;

export const getDrawerState = (state: RootState) => state.app.isDrawerOpen;
export const getViewSelected = (state: RootState) => state.app.viewSelected;
export const getSelectedHour = (state: RootState) => state.app.selectedHour;
export const getSelectedEvent = (state: RootState) => state.app.selectedEventID;
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
      event_date: new Date(e.event_date),
    }))
);

export const getSelectedDate = createSelector(
  [(state: RootState) => state.app.selectedDate],
  (selectedDate) => new Date(selectedDate)
);
export const getUser = (state: RootState) => state.app.user;

export default appSlice.reducer;
