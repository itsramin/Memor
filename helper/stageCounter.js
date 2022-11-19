export const stageCounter = (cards, stages) => {
  const num = cards.reduce((sum, cur) => {
    if (cur.stage > stages[0] && cur.stage <= stages[1]) ++sum;
    return +sum;
  }, 0);

  return num;
};
