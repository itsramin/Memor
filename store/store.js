import { configureStore } from "@reduxjs/toolkit";
import market from "./market";
import sets from "./sets";

const store = configureStore({
  reducer: { sets: sets.reducer, market: market.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
