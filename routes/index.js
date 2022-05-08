const router = require('express').Router();
const resultRouter = require('./result');
const userRouter = require('./user');
const CustomError = require('../middlewares/custom-error-router');
const { errorMessage } = require('../utils/const');

router.use('/result', resultRouter);
router.use('/user', userRouter);
router.use('*', () => {
  throw new CustomError(404, errorMessage.pageNotFound);
});

module.exports = router;
