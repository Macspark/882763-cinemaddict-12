import AbstractView from "./abstract.js";

const createFilmsBlockTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>
    </section>`
  );
};

export default class FilmsBlock extends AbstractView {
  getTemplate() {
    return createFilmsBlockTemplate();
  }
}
