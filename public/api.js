"use strict";

function getMovieInfo(searchMovie, callback) {
  const settings = {
    data: {
      query: `title: ${searchMovie}`,
      format: "json",
      limit: 1
    },
    success: callback
  };
  $.ajax(settings);
}

var MOCK_MOVIE_DATA = {
  movieData: [
    {
      id: 111111,
      poster: "http://via.placeholder.com/150x200",
      overview:
        "Movie description 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 1",
      release_date: "2017-1-1"
    }
  ]
};

function getMovieData(callbackFn) {
  setTimeout(function() {
    callbackFn(MOCK_MOVIE_DATA);
  }, 100);
}
