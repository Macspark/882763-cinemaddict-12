export const humanizeDuration = (value) => {
  const hour = 60;
  const hours = Math.floor(value / hour);
  if (hours === 0) {
    return `${value}m`;
  } else {
    const minutes = value - (hours * hour);
    if (minutes !== 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${hours}h`;
    }
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
