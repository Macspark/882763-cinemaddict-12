import AbstractView from "./abstract.js";

const createNoDataTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class NoData extends AbstractView {
  getTemplate() {
    return createNoDataTemplate();
  }
}
