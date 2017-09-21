export const subtractDay = (date: Date): Date => {
  const newDate = new Date();
  newDate.setDate((date.getDate() - 1));
  return newDate;
};
