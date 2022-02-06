const router = require('express').Router();
const { createMovieValidation, movieIdValidation } = require('../middlewares/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:id', movieIdValidation, deleteMovie);

module.exports = router;
