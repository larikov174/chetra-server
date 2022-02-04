const Movie = require('../models/movie');
const CustomError = require('../middlewares/custom-error-router');
const { errorMassege } = require('../utils/const');

const {
  needAuth,
  alreadyExists,
  wrongData,
  movieNotFound,
} = errorMassege;

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movie) => res.status(200).send(movie.sort((a, b) => b.createdAt - a.createdAt)))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.countDocuments({ movieId }, (_, count) => {
    if (count === 0) {
      Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner: req.user._id,
      })
        .then((movie) => Movie.findById(movie._id)
          .populate(['owner'])
          .orFail(new CustomError(404, movieNotFound))
          .then((newMovie) => res.status(200).send(newMovie)))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new CustomError(400, wrongData));
          } else { next(err); }
        });
    } else {
      res.status(409).send({ massage: alreadyExists });
    }
  });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new CustomError(404, movieNotFound))
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        Movie.findByIdAndDelete(req.params.id)
          .populate(['owner'])
          .orFail(new CustomError(404, movieNotFound))
          .then((deletedCard) => res.status(200).send(deletedCard));
      } else {
        throw new CustomError(403, needAuth);
      }
    })
    .catch(next);
};
