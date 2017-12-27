`use strict`;

const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    poster: String,
    overview: String,
    title: String,
    release_date: String,
    watched: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movies", movieSchema);

module.exports = Movie;
