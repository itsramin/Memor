export const getLevel = (stage) => {
  let level = 0;

  if (stage > 30) {
    level = 6;
  } else if (stage > 15) {
    level = 5;
  } else if (stage > 7) {
    level = 4;
  } else if (stage > 3) {
    level = 3;
  } else if (stage > 1) {
    level = 2;
  } else if (stage === 1) {
    level = 1;
  }

  return level;
};

export const getLevelsArr = (cards) => {
  const arr = [0, 0, 0, 0, 0, 0, 0];
  if (cards.length > 0) {
    cards.forEach((card) => {
      const level = getLevel(card.stage);
      arr[level]++;
    });
  }

  return arr;
};

export const getSetProgress = (levelsArr) => {
  const maxScore = levelsArr.reduce((sum, cur) => sum + cur, 0) * 6;
  const setSum =
    levelsArr.reduce((sum, cur, i) => sum + cur * i, 0) - levelsArr[1];

  const score = (setSum / (maxScore > 0 ? maxScore : 1)) * 100;
  return Math.round(score);
};
