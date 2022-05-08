const Result = require('../models/result');
const CustomError = require('../middlewares/custom-error-router');
const { errorMessage } = require('../utils/const');

const { userNotFound } = errorMessage;

module.exports.getUserByEmail = (req, res, next) => {
  const { email } = req.body;
  Result.find({ email })
    .orFail(new CustomError(404, userNotFound))
    .then((user) => {
      res.status(200).send(user[0]._id);
    })
    .catch(next);
};
