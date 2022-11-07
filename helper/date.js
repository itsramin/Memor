export const futureDate = (days) => {
  const today = new Date();

  const future = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + +days
  );

  return future;
};
