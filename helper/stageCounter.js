export const stageCounter = (cards, stage) => {
  const num = cards.reduce((sum, cur) => {
    if (cur.stage === stage) ++sum;
    return sum;
  }, 0);

  return num;
};
