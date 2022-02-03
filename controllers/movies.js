const Movie = require('../models/movie');
const CustomError = require('../middlewares/custom-error-router');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movie) => res.status(200).send(movie.sort((a, b) => b.createdAt - a.createdAt)))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
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
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner: req.user._id,
      })
        .then((movie) => Movie.findById(movie._id)
          .populate(['owner'])
          .orFail(new CustomError(404, 'Ошибка добавления в базу'))
          .then((newMovie) => res.status(200).send(newMovie)))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new CustomError(400, 'Переданы невалидные данные.'));
          } else { next(err); }
        });
    } else {
      res.status(409).send({ massage: 'Данный фильм был добавлен ранее' });
    }
  });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new CustomError(404, 'Фильм по указанному _id в базе не найден'))
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        Movie.findByIdAndDelete(req.params.id)
          .populate(['owner'])
          .orFail(new CustomError(404, 'Ошибка удаления. Фильм по указанному _id не найден'))
          .then((deletedCard) => res.status(200).send(deletedCard));
      } else {
        throw new CustomError(403, 'У вас нет прав на это действие');
      }
    })
    .catch(next);
};
