const Result = require('../models/result');
const CustomError = require('../middlewares/custom-error-router');

const createResult = (req, res, next) => {
  const { result, email } = req.body;

  Result.create({
    result,
    email,
  })
    .then((newResult) => res.status(200).send(newResult))
    .catch((err) => next(new CustomError(err.code, err)));
};

module.exports.updateResult = (req, res, next) => {
  const { result, email } = req.body;
  Result.findOneAndUpdate(
    { email },
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
      createResult(req, res, next);
    });
};
