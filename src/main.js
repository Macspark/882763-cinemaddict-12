import {createUserTemplate} from "./view/user.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsBlockTemplate} from "./view/films-block.js";
// import {createTopRatedTemplate} from "./view/top-rated.js";
// import {createMostCommentedTemplate} from "./view/most-commented.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createDetailsTemplate} from "./view/details.js";
import {createLoadMoreBtnTemplate} from "./view/load-more-btn.js";
import {createStatTemplate} from "./view/stat.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";

const FILMS_AMOUNT = 17;
const FILMS_PER_STEP = 5;
const filmsList = new Array(FILMS_AMOUNT).fill().map(generateFilm);
const filters = generateFilter(filmsList);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, createUserTemplate(), `beforeend`);
render(main, createFilterTemplate(filters), `beforeend`);
render(main, createSortTemplate(), `beforeend`);
render(main, createFilmsBlockTemplate(), `beforeend`);

const filmsElement = main.querySelector(`.films`);
const filmsContainer = filmsElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(filmsList.length, FILMS_PER_STEP); i++) {
  render(filmsContainer, createFilmCardTemplate(filmsList[i]), `beforeend`);
}

if (filmsList.length > FILMS_PER_STEP) {
  render(filmsContainer, createLoadMoreBtnTemplate(), `afterend`);

  const loadMoreBtn = filmsElement.querySelector(`.films-list__show-more`);
  let renderedFilms = FILMS_PER_STEP;

  loadMoreBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmsList
      .slice(renderedFilms, renderedFilms + FILMS_PER_STEP)
      .forEach((film) => render(filmsContainer, createFilmCardTemplate(film), `beforeend`));

    renderedFilms += FILMS_PER_STEP;

    if (renderedFilms >= filmsList.length) {
      loadMoreBtn.remove();
    }
  });
}

// render(films, createTopRatedTemplate(), `beforeend`);
// render(films, createMostCommentedTemplate(), `beforeend`);

// const topRatedContainer = films.querySelector(`.films-list--rated .films-list__container`);
// const mostCommentedContainer = films.querySelector(`.films-list--commented .films-list__container`);

// render(topRatedContainer, createFilmCardTemplate(), `afterbegin`);
// render(topRatedContainer, createFilmCardTemplate(), `afterbegin`);
// render(mostCommentedContainer, createFilmCardTemplate(), `afterbegin`);
// render(mostCommentedContainer, createFilmCardTemplate(), `afterbegin`);

const footer = document.querySelector(`.footer`);
const footerStats = document.querySelector(`.footer__statistics`);
render(footerStats, createStatTemplate(filmsList.length), `beforeend`);

const createFilmPopup = () => {
  render(footer, createDetailsTemplate(filmsList[0]), `afterend`);
};
const filmTitle = filmsContainer.querySelector(`.film-card__title`);
const filmPoster = filmsContainer.querySelector(`.film-card__poster`);
const filmComments = filmsContainer.querySelector(`.film-card__comments`);

filmTitle.addEventListener(`click`, createFilmPopup);
filmPoster.addEventListener(`click`, createFilmPopup);
filmComments.addEventListener(`click`, createFilmPopup);
