const { celebrate, Joi } = require('celebrate');

const updateResultValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    result: Joi.number().required().min(0),
  }),
});

module.exports = {
  updateResultValidation,
};
