import { configureStore } from "@reduxjs/toolkit";
import market from "./market";
import sets from "./sets";
import settings from "./settings";

const store = configureStore({
  reducer: { sets, market, settings },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
