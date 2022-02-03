const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
      default: 'Страна',
    },
    director: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
      default: 'Режисер фильма',
    },
    duration: {
      type: Number,
      min: 0,
      max: 300,
      required: true,
      default: 120,
    },
    year: {
      type: String,
      length: 4,
      required: true,
      default: 'Дата',
    },
    description: {
      type: String,
      minlength: 1,
      maxlength: 2000,
      required: true,
      default: 'Описание фильма',
    },
    image: {
      type: String,
      lowercase: true,
      required: true,
      validate: {
        validator(v) {
          return isURL(v);
        },
      },
      default:
        '../static/default-poster.png',
    },
    trailerLink: {
      type: String,
      lowercase: true,
      required: true,
      validate: {
        validator(v) {
          return isURL(v);
        },
      },
      default: 'https://www.youtube.com/',
    },
    thumbnail: {
      type: String,
      lowercase: true,
      required: true,
      validate: {
        validator(v) {
          return isURL(v);
        },
      },
      default:
        '../static/default-poster.png',
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    nameRU: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
      default: 'Название фильма',
    },
    nameEN: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
      default: 'Movie title',
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
