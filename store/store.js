import { configureStore } from "@reduxjs/toolkit";
import sets from "./sets";

const store = configureStore({
  reducer: { sets: sets },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
