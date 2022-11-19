import { createSlice } from "@reduxjs/toolkit";

const sets = createSlice({
  name: "sets",
  initialState: {
    allSets: [
      {
        setId: "set1",
        name: "504 words",
        lastDaily: "2022-11-16",
        isDailyCardsCreateToday: false,
        description:
          "A self-help guide to the use of 504 words used regularly by educated people.",
        cards: [
          {
            question: "abandon",
            answer: "forsake; leave behind",
            cardId: "card1",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "abide",
            answer: "dwell",
            cardId: "card2",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "abolish",
            answer: "do away with",
            cardId: "card3",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "abroad",
            answer: "to or in a foreign country",
            cardId: "card4",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "absorb",
            answer: "take in a liquid",
            cardId: "card5",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "absurd",
            answer: "inconsistent with reason or logic or common sense",
            cardId: "card6",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "abundant",
            answer: "present in great quantity",
            cardId: "card7",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "abuse",
            answer: "cruel or inhumane treatment",
            cardId: "card8",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "accurate",
            answer: "characterized by perfect conformity to fact or truth",
            cardId: "card9",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "acknowledge",
            answer: "declare to be true or admit the existence or reality of ",
            cardId: "card10",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "addict",
            answer: "to cause to become dependent",
            cardId: "card11",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "adequate",
            answer:
              "having the requisite qualities or resources to meet a task",
            cardId: "card12",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "adolescent",
            answer: "a person who is older than 12 but younger than 20",
            cardId: "card13",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "alter",
            answer: "cause to change; make different",
            cardId: "card14",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "amateur",
            answer: "someone who pursues a study or sport as a pastime",
            cardId: "card15",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "ambush",
            answer: "the act of hiding and waiting to make a surprise attack",
            cardId: "card16",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "annual",
            answer: "occurring every year",
            cardId: "card17",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "anticipate",
            answer: "regard something as probable or likely",
            cardId: "card18",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "appeal",
            answer: "earnest or urgent request",
            cardId: "card19",
            stage: "depo",
            fullMemorize: false,
          },
          {
            question: "appoint",
            answer: "assign a duty, responsibility, or obligation to",
            cardId: "card20",
            stage: "depo",
            fullMemorize: false,
          },
        ],
        dailyCards: [],
      },
    ],
  },
  reducers: {
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

      targetSet.cards.push({
        cardId: `${+new Date()}${Math.floor(Math.random() * 1000)}`,
        answer: action.payload.answer,
        question: action.payload.question,
        stage: "depo",
        fullMemorize: false,
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
        dailyCards: [],
        lastDaily: "",
        isDailyCardsCreateToday: false,
      });
    },
    deleteSet(state, action) {
      const targetSetIndex = state.allSets.findIndex(
        (set) => set.setId === action.payload
      );
      state.allSets.splice(targetSetIndex, 1);
    },
    addFromMarket(state, action) {
      state.allSets.unshift(action.payload.newSet);
    },
    changeLastDaily(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );
      targetSet.lastDaily = new Date(action.payload.lastDaily)
        .toISOString()
        .slice(0, 10);
    },
    stageUpCurCard(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );
      const targetCard = targetSet.dailyCards.find(
        (card) => card.cardId === action.payload.cardId
      );

      ++targetCard.stage;

      if (targetCard.stage === 31) {
        targetCard.fullMemorize = true;
      }

      targetSet.cards.push(targetCard);
      targetSet.dailyCards = targetSet.dailyCards.filter(
        (card) => card.cardId !== action.payload.cardId
      );
    },
    stageDownCurCard(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );
      const targetCard = targetSet.dailyCards.find(
        (card) => card.cardId === action.payload.cardId
      );
      targetCard.stage = 1;
      targetSet.cards.push(targetCard);
      targetSet.dailyCards = targetSet.dailyCards.filter(
        (card) => card.cardId !== action.payload.cardId
      );
    },
    createDailyCards(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );
      const pastCards = targetSet.cards.filter((card) =>
        [1, 3, 7, 15, 30].includes(card.stage)
      );
      targetSet.dailyCards = [...pastCards];

      // create 6 depo cards
      const depoCards = targetSet.cards
        .filter((card) => card.stage === "depo")
        .slice(0, action.payload.dailyCardsAmount);

      // change depo cards stage to 1
      depoCards.forEach((card) => (card.stage = 1));

      // find depo cards id
      const depoCardsCardId = depoCards.map((card) => card.cardId);

      targetSet.dailyCards.push(...depoCards);

      // clean depo and past cards from all cards
      targetSet.cards = targetSet.cards.filter(
        (card) => ![1, 3, 7, 15, 30].includes(card.stage)
      );
      targetSet.cards = targetSet.cards.filter(
        (card) => !depoCardsCardId.includes(card.cardId)
      );
    },
    stageUpAllCards(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );
      const filteredCards = targetSet.cards.filter(
        (card) => card.stage !== "depo"
      );
      filteredCards.forEach((card) => {
        if (card.stage !== 30) {
          card.stage++;
        }
      });
    },
    changeCreationStatus(state, action) {
      const targetSet = state.allSets.find(
        (set) => set.setId === action.payload.setId
      );
      targetSet.isDailyCardsCreateToday = true;
    },
    changeAllCreationStatus(state) {
      state.allSets.forEach((set) => (set.isDailyCardsCreateToday = false));
    },
    cleanDailyCards(state) {
      state.allSets.forEach((set) => {
        set.cards.push(...set.dailyCards);
        set.dailyCards = [];
      });
    },
  },
});

export const setsActions = sets.actions;

export default sets.reducer;

// setId: "set1",
// name: "504 words",

// cards: [
//   {
//     question: "q1?",
//     answer: "ans1",
//     cardId: "car1",
//     nextReview: "",
//     stage: 1,
//     fullMemorize: false,
//   },
//   {
//     question: "q2?",
//     answer: "ans2",
//     cardId: "car2",
//     nextReview: "",
//     stage: 1,
//     fullMemorize: false,
//   },
//   {
//     question: "q3?",
//     answer: "ans3",
//     cardId: "car3",
//     nextReview: "",
//     stage: 1,
//     fullMemorize: false,
//   },
//   {
//     question: "q1 set2?",
//     answer: "ans1 set2",
//     cardId: "car4",
//     nextReview: "",
//     stage: 1,
//     fullMemorize: false,
//   },
//   {
//     question: "q2 set2?",
//     answer: "ans2 set2",
//     cardId: "car5",
//     nextReview: "",
//     stage: 1,
//     fullMemorize: false,
//   },
//   {
//     question: "q3 set2?",
//     answer: "ans3 set2",
//     cardId: "car6",
//     nextReview: "",
//     stage: 1,
//     fullMemorize: false,
//   },
// ],
// },
// {
// setId: "set2",
// name: "vocab",

// cards: [
//   {
//     question: "q1 set2?",
//     answer: "ans1 set2",
//     cardId: "car4",
//     nextReview: "",
//     stage: 1,
//     fullMemorize: false,
//   },
//   {
//     question: "q2 set2?",
//     answer: "ans2 set2",
//     cardId: "car5",
//     nextReview: "",
//     stage: 1,
//     fullMemorize: false,
//   },
//   {
//     question: "q3 set2?",
//     answer: "ans3 set2",
//     cardId: "car6",
//     nextReview: "",
//     stage: 1,
//     fullMemorize: false,
//   },
// ],
// },
