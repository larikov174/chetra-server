const Result = require('../models/result');
const CustomError = require('../middlewares/custom-error-router');
const { errorMessage } = require('../utils/const');

const { wrongData } = errorMessage;

module.exports.createResult = (req, res, next) => {
  const { result } = req.body;

  Result.create({
    result,
    owner: req.user._id,
  })
    .then((newMovie) => res.status(200).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError(400, wrongData));
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.updateResult = (req, res) => {
  const { result } = req.body;
  Result.findByIdAndUpdate(
    req.params.user._id,
    {
      result,
    },
    { new: true, runValidators: true },
  )
    .orFail(new Error('Not Found'))
    .then((item) => res.status(200).send({
      result: item.result,
    }))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(500).send({ message: 'Ошибка. Сервер не отвечает.' });
      }
    });
};
