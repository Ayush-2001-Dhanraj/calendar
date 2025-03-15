// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import storage from "redux-persist/lib/storage"; // Use localStorage
import { persistStore, persistReducer } from "redux-persist";
import appReducer from "./appSlice";

const persistConfig = {
  key: "app", // Key to store in localStorage
  storage, // Defines the storage engine
};

const persistedAppReducer = persistReducer(persistConfig, appReducer);

export interface RootState {
  app: ReturnType<typeof appReducer>;
}

const store = configureStore({
  reducer: {
    app: persistedAppReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store); // Create persistor

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
