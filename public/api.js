"use strict";

const MOVIE_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
const TV_SEARCH_URL = "https://api.themoviedb.org/3/search/tv";
const API_KEY = "2fae2a848cb96e978e3529af84d448f9";

function getMovieInfo(searchMovie, callback) {
  let settings = {
    api_key: API_KEY,
    query: `${searchMovie}`,
    page: 1,
    include_adult: false
  };
  $.getJSON(MOVIE_SEARCH_URL, settings, callback);
}

function getTvInfo(searchShow, callback) {
  let settings = {
    api_key: API_KEY,
    query: `${searchShow}`,
    page: 1
  };
  $.getJSON(TV_SEARCH_URL, settings, callback);
}
