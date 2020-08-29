import SmartView from "./smart.js";
import {formatTime} from "../utils/films.js";
import {FormatType} from "../const.js";

const createGenresTemplate = (genres) => {
  const genresWord = genres.length === 1 ? `Genre` : `Genres`;
  const genresList = genres.map((it) => {
    return (`<span class="film-details__genre">${it}</span>`);
  }).join(``);
  return (
    `<td class="film-details__term">${genresWord}</td>
    <td class="film-details__cell">
      ${genresList}
    </td>`
  );
};

const createCommentsTemplate = (comments) => {
  let allComments = comments.map((it) => {
    const {emotion, date, author, message} = it;
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${message}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${formatTime(FormatType.SINCE, date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }).join(``);
  return allComments;
};

const createDetailsTemplate = (film) => {
  const {emotion, title, titleOriginal, ageRestriction, rating, director, writers, actors, releaseDate, duration, country, genres, poster, description, comments, isWatchlisted, isWatched, isFavorite} = film;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title}">

              <p class="film-details__age">${ageRestriction}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${titleOriginal}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatTime(FormatType.DATE, releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatTime(FormatType.DURATION, duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                ${createGenresTemplate(genres)}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlisted ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${createCommentsTemplate(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${createEmotionImageTemplate(emotion)}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

const createEmotionImageTemplate = (emotion) => {
  if (emotion) {
    return (
      `<img src="./images/emoji/${emotion}.png" alt="emotion" width="79" height="68">`
    );
  }
  return (``);
};

export default class Details extends SmartView {
  constructor(film) {
    super();
    this._data = film;

    this._closeDetailsHandler = this._closeDetailsHandler.bind(this);
    this._watchlistToggleHandler = this._watchlistToggleHandler.bind(this);
    this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);
    this._addEmotionHandler = this._addEmotionHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createDetailsTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseDetailsHandler(this._callback.closeDetails);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._watchlistToggleHandler);
    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._watchedToggleHandler);
    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._favoriteToggleHandler);
    this.getElement()
      .querySelectorAll(`.film-details__emoji-item`)
      .forEach((it) => {
        it.addEventListener(`click`, this._addEmotionHandler);
      });
  }

  _watchlistToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({isWatchlisted: !this._data.isWatchlisted});
  }

  _watchedToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({isWatched: !this._data.isWatched});
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({isFavorite: !this._data.isFavorite});
  }

  _addEmotionHandler(evt) {
    if (this._data.emotion === evt.target.value) {
      return;
    }
    this.updateData({emotion: evt.target.value});
  }

  _closeDetailsHandler(evt) {
    evt.preventDefault();
    this._callback.closeDetails();
  }

  setCloseDetailsHandler(callback) {
    this._callback.closeDetails = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeDetailsHandler);
  }
}
