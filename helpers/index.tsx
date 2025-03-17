export const formattedDate = (dateNumber: number) => {
  let date = new Date(dateNumber * 1000);
  let formatDate = date.toLocaleTimeString([], {
    month: 'long',
    day: 'numeric',
  });
  return formatDate;
};

export const formattedTime = (dateNumber: number) => {
  let date = new Date(dateNumber * 1000);
  let formatDate = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return formatDate;
};
export const formatNumber = (num: number) => {
  return Math.round(num);
};
