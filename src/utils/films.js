import moment from "moment";
import {FormatType} from "../const.js";

export const formatTime = (formatType, time) => {
  if (!(time instanceof Date)) {
    return ``;
  }

  switch (formatType) {
    case FormatType.DURATION:
      return moment(time).utc(false).format(`hh[h] mm[m]`);
    case FormatType.YEAR:
      return moment(time).utc(false).format(`YYYY`);
    case FormatType.DATE:
      return moment(time).utc(false).format(`Do MMMM YYYY`);
    case FormatType.SINCE:
      return moment(time).format(`YYYY/MM/DD hh[:]mm`);
    default:
      return ``;
  }
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortByDate = (a, b) => {
  const weight = getWeightForNullDate(a.releaseDate, b.releaseDate);

  if (weight !== null) {
    return weight;
  }

  return b.releaseDate.getTime() - a.releaseDate.getTime();
};

export const sortByRating = (a, b) => {
  return b.rating - a.rating;
};
