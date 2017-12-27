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
      poster: "http://via.placeholder.com/150x200",
      overview:
        "Movie description 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 1",
      release_date: "2017-1-1"
    },
    {
      poster: "http://via.placeholder.com/150x200",
      overview:
        "Movie description 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 2",
      release_date: "2017-2-2"
    },
    {
      poster: "http://via.placeholder.com/150x200",
      overview:
        "Movie description 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 3",
      release_date: "2017-3-3"
    },
    {
      poster: "http://via.placeholder.com/150x200",
      overview:
        "Movie description 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 4",
      release_date: "2017-4-4"
    }
  ]
};

function getMovieData(callbackFn) {
  setTimeout(function() {
    callbackFn(MOCK_MOVIE_DATA);
  }, 100);
}
