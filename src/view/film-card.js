import SmartView from "./smart.js";
import {formatTime} from "../utils/films.js";
import {FormatType} from "../const.js";

export const createFilmCardTemplate = (film) => {
  const {title, rating, releaseDate, duration, genres, poster, description, comments} = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatTime(FormatType.YEAR, releaseDate)}</span>
        <span class="film-card__duration">${formatTime(FormatType.DURATION, duration)}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item${film.isWatchlisted ? ` film-card__controls-item--active` : ``} button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item${film.isWatched ? ` film-card__controls-item--active` : ``} button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item${film.isFavorite ? ` film-card__controls-item--active` : ``} button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends SmartView {
  constructor(film) {
    super();

    this._data = film;

    this._showDetailsHandler = this._showDetailsHandler.bind(this);
    this._watchlistToggleHandler = this._watchlistToggleHandler.bind(this);
    this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmCardTemplate(this._data);
  }

  _showDetailsHandler(evt) {
    evt.preventDefault();
    this._callback.showDetails();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setShowDetailsHandler(this._callback.showDetails);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._watchlistToggleHandler);
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._watchedToggleHandler);
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favoriteToggleHandler);
  }

  _watchlistToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({isWatchlisted: !this._data.isWatchlisted});
  }

  _watchedToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({isWatched: !this._data.isWatched});
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({isFavorite: !this._data.isFavorite});
  }

  setShowDetailsHandler(callback) {
    this._callback.showDetails = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._showDetailsHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._showDetailsHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._showDetailsHandler);
  }
}
