import {createElement} from "../util.js";

const createStatTemplate = (amount) => {
  return (
    `<p>${amount} movies inside</p>`
  );
};

export default class Stat {
  constructor(filters) {
    this._element = null;
  }

  getTemplate() {
    return createStatTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
