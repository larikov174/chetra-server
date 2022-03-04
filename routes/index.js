const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const {
  login,
  logout,
  createUser,
  checkToken,
} = require('../controllers/users');
const { loginValidation, createUserValidation } = require('../middlewares/validation');
const CustomError = require('../middlewares/custom-error-router');
const { errorMessage } = require('../utils/const');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.use(auth);
router.get('/signout', logout);
router.get('/check', checkToken);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', () => {
  throw new CustomError(404, errorMessage.pageNotFound);
});

module.exports = router;
