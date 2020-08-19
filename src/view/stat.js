import AbstractView from "./abstract.js";

const createStatTemplate = (amount) => {
  return (
    `<p>${amount} movies inside</p>`
  );
};

export default class Stat extends AbstractView {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createStatTemplate(this._amount);
  }
}
