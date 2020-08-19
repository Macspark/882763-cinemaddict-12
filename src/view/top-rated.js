import AbstractView from "./abstract.js";

const createTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra films-list--rated">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class TopRated extends AbstractView {
  getTemplate() {
    return createTopRatedTemplate();
  }
}
