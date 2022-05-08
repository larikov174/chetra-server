const mongoose = require('mongoose');
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
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new CustomError(401, errorMessage.wrongUserData));
    }

    return user;
  });
};

module.exports = mongoose.model('user', userSchema);
