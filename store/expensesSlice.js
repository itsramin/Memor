import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenseList: [],
  },
  reducers: {
    addExpense(state, action) {
      state.expenseList.unshift(action.payload);
    },
    edit(state, action) {
      const index = state.expenseList.findIndex(
        (item) => item.key === action.payload.key
      );

      state.expenseList[index] = action.payload;
    },
    del(state, action) {
      const index = state.expenseList.findIndex(
        (item) => item.key === action.payload.key
      );

      state.expenseList.splice(index, 1);
    },
  },
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice.reducer;
