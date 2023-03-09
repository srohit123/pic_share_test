export const formatDate = (date: string): string => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  let month = dateObject.getMonth();
  month++;
  let day = dateObject.getDate();
  return `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
};