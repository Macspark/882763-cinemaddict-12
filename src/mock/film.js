const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);
  return arr[randomIndex];
};

const generateTitle = () => {
  const FILM_TITLES = [
    `Фильм 1`,
    `Фильм 2`,
    `Фильм 3`,
    `Фильм 4`,
    `Фильм 5`,
    `Фильм 6`,
    `Фильм 7`,
    `Фильм 8`
  ];
  return getRandomElement(FILM_TITLES);
};

const generatePoster = () => {
  const FILM_POSTERS_LINK = `./images/posters/`;
  const FILM_POSTERS = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];
  const randomPoster = FILM_POSTERS_LINK + getRandomElement(FILM_POSTERS);
  return randomPoster;
};

const generateDescription = () => {
  const DescriptionLength = {
    MIN: 1,
    MAX: 5
  };
  const FILM_DESCRIPTIONS = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  const length = getRandomInteger(DescriptionLength.MIN, DescriptionLength.MAX);

  let description = ``;
  for (let i = 0; i < length; i++) {
    description = `${description} ${getRandomElement(FILM_DESCRIPTIONS)}`;
  }
  description = description.trim();
  return description;
};

const generateDate = () => {
  const year = getRandomInteger(2000, 2020);
  const month = getRandomInteger(1, 12);
  const day = getRandomInteger(1, 30);
  const hour = getRandomInteger(0, 24);
  const minute = getRandomInteger(0, 59);
  return `${year}/${month}/${day} ${hour}:${minute}`;
};

const generateComment = () => {
  const EMOTIONS = [
    `mile`,
    `sleeping`,
    `puke`,
    `angry`
  ];
  const AUTHORS = [
    `Автор 1`,
    `Автор 2`,
    `Автор 3`,
    `Автор 4`
  ];
  const MESSAGES = [
    `Отлично!!!!`,
    `Так себе, но тёще понравилось`,
    `Не понравилось, кто это снимал?`,
    `Под пивко пойдёт`,
    `врыкрфкапфкп`,
  ];

  return {
    emotion: getRandomElement(EMOTIONS),
    date: generateDate(),
    author: getRandomElement(AUTHORS),
    message: getRandomElement(MESSAGES)
  };
};

const generateComments = () => {
  const CommentsAmountRange = {
    MIN: 0,
    MAX: 5
  };
  const amount = getRandomInteger(CommentsAmountRange.MIN, CommentsAmountRange.MAX);
  const comments = [];
  for (let i = 0; i < amount; i++) {
    comments.push(generateComment());
  }
  return comments;
};

const generateRating = () => {
  const RatingRange = {
    MIN: 1,
    MAX: 10
  };
  return getRandomInteger(RatingRange.MIN, RatingRange.MAX);
};

const generateYear = () => {
  const YearRange = {
    MIN: 1920,
    MAX: 2020
  };
  return getRandomInteger(YearRange.MIN, YearRange.MAX);
};

const generateDuration = () => {
  const DurationMinRange = {
    MIN: 50,
    MAX: 210
  };
  const hour = 60;
  const duration = getRandomInteger(DurationMinRange.MIN, DurationMinRange.MAX);
  const hours = Math.floor(duration / hour);
  if (hours === 0) {
    return `${duration}m`;
  } else {
    const minutes = duration - (hours * hour);
    if (minutes !== 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${hours}h`;
    }
  }
};

const generateGenre = () => {
  const GENRES = [
    `action`,
    `mystery`,
    `thriller`,
    `fantasy`,
    `horror`
  ];
  const amount = getRandomInteger(1, GENRES.length);
  let filmGenres = [];
  for (let i = 0; i < amount; i++) {
    filmGenres.push(getRandomElement(GENRES));
  }
  return filmGenres;
};


export const generateFilm = () => {
  return {
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: generateComments(),
    rating: generateRating(),
    year: generateYear(),
    duration: generateDuration(),
    genre: generateGenre(),
  };
};
