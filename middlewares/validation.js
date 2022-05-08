const { celebrate, Joi } = require('celebrate');

const createResultValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    result: Joi.number().required().min(0),
    attempt: Joi.number().required().min(0),
  }),
});

const updateResultValidation = celebrate({
  body: Joi.object().keys({
    result: Joi.number().required().min(0),
    attempt: Joi.number().required().min(0),
  }),
});

const getUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  createResultValidation, updateResultValidation, getUserValidation,
};
