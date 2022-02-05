const jwt = require('jsonwebtoken');
const CustomError = require('./custom-error-router');
const { errorMessage, devJWT } = require('../utils/const');

const { JWT_SECRET = devJWT } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new CustomError(401, errorMessage.needAuth);
  }

  req.user = payload;
  next();
};
