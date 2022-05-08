const Result = require('../models/result');
const CustomError = require('../middlewares/custom-error-router');
const { errorMessage } = require('../utils/const');

const { wrongData } = errorMessage;

module.exports.getUserByEmail = (req, res, next) => {
  const { email } = req.body;
  Result.find({ email })
    .then((user) => {
      res.status(200).send(user[0]._id);
    })
    .catch(next);
};

module.exports.createResult = (req, res, next) => {
  const { result, email, attempt } = req.body;

  Result.create({
    result,
    email,
    attempt,
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
  const { result, attempt } = req.body;
  Result.findByIdAndUpdate(
    req.params.id,
    {
      result,
      attempt,
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
