const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const resultSchema = new mongoose.Schema(
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

    result: {
      type: Number,
      min: 0,
      max: 3000,
      default: 0,
      required: true,
    },

    attempt: {
      type: Number,
      min: 0,
      max: 3000,
      default: 0,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    versionKey: 'v',
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('result', resultSchema);
