const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const CustomError = require('../middlewares/custom-error-router');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new CustomError(401, 'Вы не авторизованы в системе'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then((hashPassword) => {
    User.init()
      .then(() => User.create({
        password: hashPassword, email, name,
      }))
      .then((user) => res.status(200).send({ _id: user._id }))
      .catch((err) => {
        if (err.code === 11000) {
          next(new CustomError(409, `db err code ${err.code} (email уже зарегистрирован)`));
        } else if (err.name === 'ValidationError') {
          next(new CustomError(400, 'Переданы невалидные данные.'));
        } else { next(err); }
      });
  });
};

module.exports.checkToken = (req, res) => {
  res.status(200).send({ token: 'ok' })
    .end();
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7 days' },
      );
      res.cookie('jwt', token, {
        maxAge: 6048000,
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).send({ login: 'ok' })
        .end();
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  const token = req.cookies.jwt;
  res.clearCookie('jwt', token, {
    maxAge: 6048000,
    httpOnly: true,
    sameSite: true,
  });
  return res.status(200).send({ status: 'сессия закрыта' });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(new CustomError(404, 'Данный пользователь не найден'))
    .then((user) => res.status(200).send({
      name: user.name,
      email: user.email,
    }))
    .catch(() => next(new CustomError(409, 'Ошибка передаваемых данных')));
};
