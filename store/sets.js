import { createSlice } from "@reduxjs/toolkit";
import { futureDate } from "../helper/date";

const sets = createSlice({
  name: "sets",
  initialState: {
    allSets: [
      {
        setId: "set1",
        name: "504 words",
        cards: [
          { question: "q1?", answer: "ans1", cardId: "car1", nextReview: "" },
          { question: "q2?", answer: "ans2", cardId: "car2", nextReview: "" },
          { question: "q3?", answer: "ans3", cardId: "car3", nextReview: "" },
          {
            question: "q1 set2?",
            answer: "ans1 set2",
            cardId: "car4",
            nextReview: "",
          },
          {
            question: "q2 set2?",
            answer: "ans2 set2",
            cardId: "car5",
            nextReview: "",
          },
          {
            question: "q3 set2?",
            answer: "ans3 set2",
            cardId: "car6",
            nextReview: "",
          },
        ],
      },
      {
        setId: "set2",
        name: "vocab",
        cards: [
          {
            question: "q1 set2?",
            answer: "ans1 set2",
            cardId: "car4",
            nextReview: "",
          },
          {
            question: "q2 set2?",
            answer: "ans2 set2",
            cardId: "car5",
            nextReview: "",
          },
          {
            question: "q3 set2?",
            answer: "ans3 set2",
            cardId: "car6",
            nextReview: "",
          },
        ],
      },
    ],
  },
  reducers: {
    changeDate(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );

      const targetCardIndex = targetSet.cards.findIndex(
        (card) => card.cardId === action.payload.cardId
      );

      targetSet.cards[targetCardIndex].nextReview = futureDate(
        action.payload.days
      );
    },
    deleteCard(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );

      const targetCardIndex = targetSet.cards.findIndex(
        (card) => card.cardId === action.payload.cardId
      );

      targetSet.cards.splice(targetCardIndex, 1);
    },
    updateCard(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );

      const targetCardIndex = targetSet.cards.findIndex(
        (card) => card.cardId === action.payload.cardId
      );

      targetSet.cards[targetCardIndex].question = action.payload.question;
      targetSet.cards[targetCardIndex].answer = action.payload.answer;
    },
    addCard(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );

      targetSet.cards.push(action.payload.cardData);
    },
  },
});

export const setsActions = sets.actions;

export default sets.reducer;
