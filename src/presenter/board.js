import SortView from "../view/sort.js";
import FilmsBlockView from "../view/films-block.js";
import FilmsContainerView from "../view/films-container.js";
import NoDataView from "../view/no-data.js";
import FilmCardView from "../view/film-card.js";
import LoadMoreBtnView from "../view/load-more-btn.js";
import DetailsView from "../view/details.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

const FILMS_PER_STEP = 5;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedTaskCount = FILMS_PER_STEP;

    this._sortComponent = new SortView();
    this._filmsBlockComponent = new FilmsBlockView();
    this._filmContainerComponent = new FilmsContainerView();
    this._noDataComponent = new NoDataView();
    this._loadMoreBtnComponent = new LoadMoreBtnView();

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._boardContainer, this._filmsBlockComponent, RenderPosition.BEFOREEND);

    if (this._films.length > 0) {
      render(this._filmsBlockComponent.getElement().querySelector('.films-list'), this._filmContainerComponent, RenderPosition.BEFOREEND);
    } else {
      render(this._filmsBlockComponent.getElement().querySelector('.films-list'), this._noDataComponent, RenderPosition.BEFOREEND);
    }

    this._renderFilms(0, Math.min(this._films.length, FILMS_PER_STEP));
    if (this._films.length > FILMS_PER_STEP) {
      this._renderLoadMoreBtn();
    }
  }

  _renderFilm(film) {
    const filmComponent = new FilmCardView(film);
    const detailsComponent = new DetailsView(film);

    const showDetails = () => {
      render(document.querySelector('body'), detailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscDown);
    };

    const onEscDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closeDetails();
        document.removeEventListener(`keydown`, onEscDown);
      }
    };

    const closeDetails = () => {
      detailsComponent.getElement().remove();
    };

    filmComponent.setClickHandler(showDetails);
    detailsComponent.setClickHandler(closeDetails);

    render(this._filmContainerComponent, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films.slice(from, to).forEach((film) => this._renderFilm(film));
  }

  _handleLoadMoreBtnClick() {
    this._renderFilms(this._renderedTaskCount, this._renderedTaskCount + FILMS_PER_STEP);
    this._renderedTaskCount += FILMS_PER_STEP;

    if (this._renderedTaskCount >= this._films.length) {
      remove(this._loadMoreBtnComponent);
    }
  }

  _renderLoadMoreBtn() {
    render(this._filmsBlockComponent.getElement().querySelector('.films-list'), this._loadMoreBtnComponent, RenderPosition.BEFOREEND);
    this._loadMoreBtnComponent.setClickHandler(this._handleLoadMoreBtnClick);
  }
}
