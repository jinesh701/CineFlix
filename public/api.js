"use strict";

const MOVIE_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
const MOVIE_NOW_PLAYING_URL = "https://api.themoviedb.org/3/movie/now_playing";
const MOVIE_UPCOMING_URL = "https://api.themoviedb.org/3/movie/upcoming";
const TV_POPULAR_URL = "https://api.themoviedb.org/3/tv/popular";
const TV_TOP_RATED_URL = "https://api.themoviedb.org/3/tv/top_rated";
const TV_SEARCH_URL = "https://api.themoviedb.org/3/search/tv";
const API_KEY = "2fae2a848cb96e978e3529af84d448f9";

function getLandingMovies(movieNowPlayingDisplay, movieUpcomingDisplay) {
  let settings = {
    api_key: API_KEY,
    region: "US",
    adult: false
  };
  $.getJSON(MOVIE_NOW_PLAYING_URL, settings, movieNowPlayingDisplay);
  $.getJSON(MOVIE_UPCOMING_URL, settings, movieUpcomingDisplay);
}

function getLandingTv(tvPopularDisplay, tvTopRatedDisplay) {
  let settings = {
    api_key: API_KEY
  };
  $.getJSON(TV_POPULAR_URL, settings, tvPopularDisplay);
  $.getJSON(TV_TOP_RATED_URL, settings, tvTopRatedDisplay);
}

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
