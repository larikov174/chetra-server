const { errorMassege } = require('../utils/const');

module.exports = (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .send({
      message: err.statusCode
        ? `code-${err.statusCode}. ${err.message}`
        : errorMassege.defaultError,
    });
  return next();
};
