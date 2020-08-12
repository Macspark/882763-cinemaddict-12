import UserView from "./view/user.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import FilmsBlockView from "./view/films-block.js";
import FilmsContainerView from "./view/films-container.js";
import NoDataView from "./view/no-data.js";
import FilmCardView from "./view/film-card.js";
import LoadMoreBtnView from "./view/load-more-btn.js";
import StatView from "./view/stat.js";
import DetailsView from "./view/details.js";
import {generateFilm} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import {render, RenderPosition} from "./util.js";

const FILMS_AMOUNT = 17;
const FILMS_PER_STEP = 5;
const filmsList = new Array(FILMS_AMOUNT).fill().map(generateFilm);
const filters = generateFilters(filmsList);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

render(headerElement, new UserView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilmsBlockView().getElement(), RenderPosition.BEFOREEND);

const filmsListContainer = mainElement.querySelector(`.films-list`);

const renderFilm = (container, film) => {
  const filmComponent = new FilmCardView(film);
  const detailsComponent = new DetailsView(film);

  const showDetails = () => {
    render(footerElement, detailsComponent.getElement(), RenderPosition.AFTEREND);
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

  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, showDetails);
  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, showDetails);
  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, showDetails);
  detailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, closeDetails);

  render(container, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

if (filmsList.length > 0) {

  render(mainElement, new FilmsContainerView().getElement(), RenderPosition.BEFOREEND);

  const filmsContainer = mainElement.querySelector(`.films-list__container`);

  filmsList
    .slice(0, Math.min(filmsList.length, FILMS_PER_STEP))
    .forEach((film) => renderFilm(filmsContainer, film));

  if (filmsList.length > FILMS_PER_STEP) {
    render(filmsListContainer, new LoadMoreBtnView().getElement(), RenderPosition.BEFOREEND);

    const loadMoreBtn = filmsListContainer.querySelector(`.films-list__show-more`);
    let renderedFilms = FILMS_PER_STEP;

    loadMoreBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      filmsList
        .slice(renderedFilms, renderedFilms + FILMS_PER_STEP)
        .forEach((film) => renderFilm(filmsContainer, film));

      renderedFilms += FILMS_PER_STEP;

      if (renderedFilms >= filmsList.length) {
        loadMoreBtn.remove();
      }
    });
  }
} else {
  render(filmsListContainer, new NoDataView().getElement(), RenderPosition.BEFOREEND);
}


const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new StatView(filmsList.length).getElement(), RenderPosition.BEFOREEND);
