const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const CustomError = require('../middlewares/custom-error-router');
const { errorMessage } = require('../utils/const');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator(v) {
          return isEmail(v);
        },
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new CustomError(401, errorMessage.wrongUserData),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new CustomError(401, errorMessage.wrongUserData),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
