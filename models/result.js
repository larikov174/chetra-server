const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    result: {
      type: Number,
      min: 0,
      max: 3000,
      default: 0,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
