const { errorMessage } = require('../utils/const');

module.exports = (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .send({
      message: err.statusCode
        ? err.message
        : errorMessage.defaultError,
    });
  return next();
};
