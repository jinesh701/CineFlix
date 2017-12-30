`use strict`;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const movieandTvSchema = mongoose.Schema(
  {
    poster: String,
    overview: String,
    title: String,
    release_date: String,
    watched: { type: Boolean, required: true, default: false },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  },
  { timestamps: true }
);

const Media = mongoose.model("Watchlist", movieandTvSchema);

module.exports = Media;
