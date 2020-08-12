import {createElement} from "../util.js";

const createStatTemplate = (amount) => {
  return (
    `<p>${amount} movies inside</p>`
  );
};

export default class Stat {
  constructor(amount) {
    this._amount = amount;
    this._element = null;
  }

  getTemplate() {
    return createStatTemplate(this._amount);
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
