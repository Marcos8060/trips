import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./features/trips/index";

export const store = configureStore({
  reducer: {
    trips: tripReducer,
  },
});
