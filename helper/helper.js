export const getLevel = (stage) => {
  let level = 0;

  switch (stage) {
    case stage > 30:
      level = 6;
      break;
    case stage > 15:
      level = 5;
      break;
    case stage > 7:
      level = 4;
      break;
    case stage > 3:
      level = 3;
      break;
    case stage > 1:
      level = 2;
      break;
    case 1:
      level = 1;
      break;
  }

  return level;
};

export const getLevelsArr = (cards) => {
  const arr = [0, 0, 0, 0, 0, 0, 0];
  cards.forEach((card) => {
    const level = getLevel(card.stage);
    arr[level]++;
  });
  return arr;
};
