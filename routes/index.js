const router = require('express').Router();
const resultRouter = require('./result');
const CustomError = require('../middlewares/custom-error-router');
const { errorMessage } = require('../utils/const');

router.use('/save', resultRouter);
router.use('*', () => {
  throw new CustomError(404, errorMessage.pageNotFound);
});

module.exports = router;
