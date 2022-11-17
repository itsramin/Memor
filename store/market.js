import { createSlice } from "@reduxjs/toolkit";

const market = createSlice({
  name: "market",
  initialState: {
    allSets: [
      {
        setId: "set1",
        name: "504 words",
        lastDaily: "",
        description:
          "A self-help guide to the use of 504 words used regularly by educated people.",
        cards: [
          {
            question: "abandon",
            answer: "forsake; leave behind",
            cardId: "car1",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "abide",
            answer: "dwell",
            cardId: "car2",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "abolish",
            answer: "do away with",
            cardId: "car3",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "abroad",
            answer: "to or in a foreign country",
            cardId: "car4",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "absorb",
            answer: "take in a liquid",
            cardId: "car5",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "absurd",
            answer: "inconsistent with reason or logic or common sense",
            cardId: "car6",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "abundant",
            answer: "present in great quantity",
            cardId: "car7",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "abuse",
            answer: "cruel or inhumane treatment",
            cardId: "car8",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "accurate",
            answer: "characterized by perfect conformity to fact or truth",
            cardId: "car9",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
          {
            question: "acknowledge",
            answer: "declare to be true or admit the existence or reality of ",
            cardId: "car10",
            nextReview: "",
            stage: 1,
            fullMemorize: false,
          },
        ],
      },
      {
        setId: "set2",
        name: "vocab",
        lastDaily: "",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem deserunt et id autem voluptates possimus dolore, delectus quo quis reprehenderit aliquid obcaecati veniam nemo repellendus a repudiandae excepturi quas mollitia!",
        cards: [
          {
            question: "abandon",
            answer: "forsake; leave behind",
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
// {
//   question: "q3 set2?",
//   answer: "ans3 set2",
//   cardId: "car6",
//   nextReview: "",
//   stage: 1,
//   fullMemorize: false,
// },
