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
