const Movie = require('../models/movie');
const CustomError = require('../middlewares/custom-error-router');
const { errorMessage } = require('../utils/const');

const {
  permissionDenied,
  wrongData,
  movieNotFound,
} = errorMessage;

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.status(200).send(movie.sort((a, b) => b.createdAt - a.createdAt)))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((newMovie) => res.status(200).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError(400, wrongData));
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new CustomError(404, movieNotFound))
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        return movie.remove()
          .then((deletedCard) => res.status(200).send(deletedCard));
      }
      throw new CustomError(403, permissionDenied);
    })
    .catch(next);
};
