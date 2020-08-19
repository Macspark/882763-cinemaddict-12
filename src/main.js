import UserView from "./view/user.js";
import FilterView from "./view/filter.js";
import StatView from "./view/stat.js";
import {generateFilm} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import BoardPresenter from "./presenter/board.js";
import {render, RenderPosition} from "./utils/render.js";

const FILMS_AMOUNT = 17;

const filmsList = new Array(FILMS_AMOUNT).fill().map(generateFilm);
const filters = generateFilters(filmsList);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const boardPresenter = new BoardPresenter(mainElement);

render(headerElement, new UserView(), RenderPosition.BEFOREEND);
render(mainElement, new FilterView(filters), RenderPosition.BEFOREEND);
render(footerElement, new StatView(filmsList.length), RenderPosition.BEFOREEND);

boardPresenter.init(filmsList);
