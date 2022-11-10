import { createSlice } from "@reduxjs/toolkit";
import { futureDate } from "../helper/date";

const sets = createSlice({
  name: "sets",
  initialState: {
    shuffle: false,
    allSets: [
      {
        setId: "set1",
        name: "504 words",

        cards: [
          {
            question: "q1?",
            answer: "ans1",
            cardId: "car1",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "q2?",
            answer: "ans2",
            cardId: "car2",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "q3?",
            answer: "ans3",
            cardId: "car3",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "q1 set2?",
            answer: "ans1 set2",
            cardId: "car4",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "q2 set2?",
            answer: "ans2 set2",
            cardId: "car5",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "q3 set2?",
            answer: "ans3 set2",
            cardId: "car6",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
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
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "q2 set2?",
            answer: "ans2 set2",
            cardId: "car5",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "q3 set2?",
            answer: "ans3 set2",
            cardId: "car6",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
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
    changeShuffle(state, action) {
      state.shuffle = action.payload;
    },
    changeStage(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );

      const targetCard = targetSet.cards.find(
        (card) => card.cardId === action.payload.cardId
      );

      if (targetCard.fullMemorize === true) return;

      if (targetCard.stage > 3) {
        targetCard.fullMemorize = true;
      }
      ++targetCard.stage;
    },
    resetStage(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload
      );

      targetSet.cards.forEach((card) => {
        card.stage = 1;
        card.fullMemorize = false;
        card.nextReview = "";
      });
    },
    changeSetName(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );
      targetSet.name = action.payload.newName;
    },
    addSet(state, action) {
      const newSetId = `s${+new Date()}${Math.floor(Math.random() * 1000)}`;
      state.allSets.unshift({
        setId: newSetId,
        name: action.payload.name,
        cards: [],
      });
    },
    deleteSet(state, action) {
      const targetSetIndex = state.allSets.findIndex(
        (set) => set.setId === action.payload
      );
      state.allSets.splice(targetSetIndex, 1);
    },
  },
});

export const setsActions = sets.actions;

export default sets.reducer;
