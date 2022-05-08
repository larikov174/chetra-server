const Result = require('../models/result');
const CustomError = require('../middlewares/custom-error-router');
const { errorMessage } = require('../utils/const');

const { alreadyExists, userNotFound } = errorMessage;

module.exports.createResult = (req, res, next) => {
  const { result, email } = req.body;

  Result.create({
    result,
    email,
  })
    .then((newResult) => res.status(200).send(newResult))
    .catch((err) => {
      if (err.code === 11000) {
        next(new CustomError(409, alreadyExists));
      } else next(err);
    });
};

module.exports.updateResult = (req, res, next) => {
  const { result } = req.body;
  Result.findByIdAndUpdate(
    req.params.id,
    {
      result,
      $inc: { attempt: 1 },
      updatedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((item) => res.status(200).send({
      result: item.result,
      attempt: item.attempt,
      updatedAt: item.updatedAt,
    }))
    .catch(() => {
      next(new CustomError(404, userNotFound));
    });
};
