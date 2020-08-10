export const generateFilters = (films) => {
  const watchlist = films.filter((it) => {
    return it.isWatchlisted;
  });
  const history = films.filter((it) => {
    return it.isWatched;
  });
  const favorites = films.filter((it) => {
    return it.isFavorite;
  });

  return {
    watchlist,
    history,
    favorites
  };
};
