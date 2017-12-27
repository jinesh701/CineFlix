`use strict`;

const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  poster: String,
  overview: String,
  title: String,
  release_date: String
});

const Movie = mongoose.model("Movies", movieSchema);

module.exports = Movie;
