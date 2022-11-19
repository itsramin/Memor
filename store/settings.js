import { createSlice } from "@reduxjs/toolkit";

const settings = createSlice({
  name: "settings",
  initialState: {
    shuffle: false,
    today: "",
    dailyCardsAmount: 6,
  },
  reducers: {
    changeShuffle(state) {
      state.shuffle = !state.shuffle;
    },
    changeToday(state) {
      state.today = new Date().toISOString().slice(0, 10);
    },
    changeDailyCardsAmount(state, action) {
      state.dailyCardsAmount = action.payload;
    },
  },
});

export const settingsActions = settings.actions;

export default settings.reducer;
