export const convertPriceToDollars = (price) => {
  const result = price / 100;
  if (result < 0) {
    return 0;
  } else {
    return result;
  }
};

export  const formatDate = (datestring) => {
  const date = new Date(datestring);
  return date.toLocaleString({
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};