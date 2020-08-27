import FilmCardView from "../view/film-card.js";
import DetailsView from "../view/details.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  DETAILS: `DETAILS`
};

export default class Film {
  constructor(filmContainerComponent, changeMode) {
    this._filmContainerComponent = filmContainerComponent;

    this._filmComponent = null;
    this._detailsComponent = null;
    this._mode = Mode.DEFAULT;
    this._changeMode = changeMode;

    this._showDetailsHandler = this._showDetailsHandler.bind(this);
    this._closeDetailsHandler = this._closeDetailsHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevDetailsComponent = this._detailsComponent;

    this._filmComponent = new FilmCardView(film);
    this._detailsComponent = new DetailsView(film);

    this._filmComponent.setShowDetailsHandler(this._showDetailsHandler);
    this._detailsComponent.setCloseDetailsHandler(this._closeDetailsHandler);

    if (prevFilmComponent === null || prevDetailsComponent === null) {
      render(this._filmContainerComponent, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.DETAILS) {
      replace(this._detailsComponent, prevDetailsComponent);
    }

    remove(prevFilmComponent);
    remove(prevDetailsComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._detailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeDetails();
    }
  }

  _showDetailsHandler() {
    render(document.querySelector(`body`), this._detailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.DETAILS;
  }

  _closeDetailsHandler() {
    this._detailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeDetailsHandler();
    }
  }
}
