const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');
const { loginValidation, createUserValidation } = require('../middlewares/validation');
const CustomError = require('../middlewares/custom-error-router');
const { errorMassege } = require('../utils/const');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.get('/signout', logout);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', () => {
  throw new CustomError(404, errorMassege.pageNotFound);
});

module.exports = router;
