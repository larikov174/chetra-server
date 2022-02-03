const jwt = require('jsonwebtoken');
const CustomError = require('./custom-error-router');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new CustomError(401, 'Необходима авторизация');
  }

  req.user = payload;
  next();
};
