const { celebrate, Joi } = require('celebrate');

const resultValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    result: Joi.string().required().min(0),
    attempt: Joi.string().required().min(0),

  }),
});

module.exports = {
  resultValidation,
};
