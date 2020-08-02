import {createUserTemplate} from "./view/user.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsBlockTemplate} from "./view/films-block.js";
import {createTopRatedTemplate} from "./view/top-rated.js";
import {createMostCommentedTemplate} from "./view/most-commented.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createStatTemplate} from "./view/stat.js";

const CARDS_AMOUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, createUserTemplate(), `beforeend`);
render(main, createNavigationTemplate(), `beforeend`);
render(main, createSortTemplate(), `beforeend`);
render(main, createFilmsBlockTemplate(), `beforeend`);

const films = main.querySelector(`.films`);
const filmsContainer = films.querySelector(`.films-list__container`);

for (let i = 0; i < CARDS_AMOUNT; i++) {
  render(filmsContainer, createFilmCardTemplate(), `afterbegin`);
}

render(films, createTopRatedTemplate(), `beforeend`);
render(films, createMostCommentedTemplate(), `beforeend`);

const topRatedContainer = films.querySelector(`.films-list--rated .films-list__container`);
const mostCommentedContainer = films.querySelector(`.films-list--commented .films-list__container`);

render(topRatedContainer, createFilmCardTemplate(), `afterbegin`);
render(topRatedContainer, createFilmCardTemplate(), `afterbegin`);
render(mostCommentedContainer, createFilmCardTemplate(), `afterbegin`);
render(mostCommentedContainer, createFilmCardTemplate(), `afterbegin`);

const footerStats = document.querySelector(`.footer__statistics`);
render(footerStats, createStatTemplate(), `beforeend`);
