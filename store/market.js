import { createSlice } from "@reduxjs/toolkit";

const market = createSlice({
  name: "market",
  initialState: {
    allSets: [
      {
        setId: "set1",
        name: "504 words",
        description:
          "A self-help guide to the use of 504 words used regularly by educated people.",
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
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem deserunt et id autem voluptates possimus dolore, delectus quo quis reprehenderit aliquid obcaecati veniam nemo repellendus a repudiandae excepturi quas mollitia!",
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
    // addToMySets(state, action) {
    //   const setId = action.payload.setId;
    //   const targetSet = state.allSets.find((set) => set.setId === setId);
    //   dispatch(setsActions.addFromMarket({ targetSet }));
    // },
  },
});

export const marketActions = market.actions;

export default market;
