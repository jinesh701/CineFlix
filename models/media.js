`use strict`;

const mongoose = require("mongoose");

const movieandTvSchema = mongoose.Schema(
  {
    poster: String,
    overview: String,
    title: String,
    release_date: String,
    watched: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

const Media = mongoose.model("Watchlist", movieandTvSchema);

module.exports = Media;
