var MOCK_MOVIE_DATA = {
  movieData: [
    {
      id: 111111,
      poster: "/movie1.jpg",
      overview:
        "Movie description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 1",
      release_date: "2007-1-1"
    },
    {
      id: 222222,
      poster: "/movie2.jpg",
      overview:
        "Movie description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 2",
      release_date: "2007-2-2"
    },
    {
      id: 333333,
      poster: "/movie3.jpg",
      overview:
        "Movie description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 3",
      release_date: "2007-3-3"
    },
    {
      id: 444444,
      poster: "/movie4.jpg",
      overview:
        "Movie description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 4",
      release_date: "2007-4-4"
    }
  ]
};

function getMovieData(callbackFn) {
  setTimeout(function() {
    callbackFn(MOCK_MOVIE_DATA);
  }, 100);
}

function displayMovieData(data) {
  for (index in data.movieData) {
    $("body").append(`<p>${data.movieData[index].title}</p>`);
  }
}

function getAndDisplayMovieData() {
  getMovieData(displayMovieData);
}

$(function() {
  getAndDisplayMovieData();
});
