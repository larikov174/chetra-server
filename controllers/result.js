const Result = require('../models/result');
const CustomError = require('../middlewares/custom-error-router');
const { errorMessage } = require('../utils/const');

const { wrongData } = errorMessage;

module.exports.createResult = (req, res, next) => {
  const { result, email } = req.body;

  Result.create({
    result,
    email,
  })
    .then((newResult) => res.status(200).send(newResult))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError(400, wrongData));
      } else {
        next(err);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.updateResult = (req, res) => {
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
    .orFail(new Error('Not Found'))
    .then((item) => res.status(200).send({
      result: item.result,
      attempt: item.attempt,
      updatedAt: item.updatedAt,
    }))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res.status(404).send({
          message: 'Пользователь по указанному email не найден',
        });
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные.',
        });
      } else {
        res.status(500).send({
          message: 'Ошибка. Сервер не отвечает.',
        });
      }
    });
};
