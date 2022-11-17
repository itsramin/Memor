export const futureDate = (days) => {
  const today = new Date();
  const future = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + +days + 1
  )
    .toISOString()
    .slice(0, 10);

  return future;
};

export const isToday = (date) => {
  if (date === "") return false;
  const target = new Date(date).toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  return target === today;
};

export const daysLeft = (date) => {
  const targetDate = +new Date(date);
  const today = +new Date(new Date().toISOString().slice(0, 10));

  const remind = Math.floor((targetDate - today) / (1000 * 24 * 60 * 60));
  return remind;
};
