import { configureStore } from "@reduxjs/toolkit";
import expensesSlice from "./expensesSlice";

const store = configureStore({ reducer: { expenses: expensesSlice } });
export default store;
