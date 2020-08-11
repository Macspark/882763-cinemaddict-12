import UserView from "./view/user.js";
import FilterView from "./view/filter.js";
import {generateFilm} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import {render, RenderPosition} from "./util.js";

const FILMS_AMOUNT = 17;
const FILMS_PER_STEP = 5;
const filmsList = new Array(FILMS_AMOUNT).fill().map(generateFilm);
const filters = generateFilters(filmsList);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, new UserView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
