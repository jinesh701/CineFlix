var MOCK_MOVIE_DATA = {
  movieData: [
    {
      id: 111111,
      poster: "http://via.placeholder.com/150x200",
      overview:
        "Movie description 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 1",
      release_date: "2017-1-1"
    },
    {
      id: 222222,
      poster: "http://via.placeholder.com/150x200",
      overview:
        "Movie description 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 2",
      release_date: "2017-2-2"
    },
    {
      id: 333333,
      poster: "http://via.placeholder.com/150x200",
      overview:
        "Movie description 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "Movie Title - 3",
      release_date: "2017-3-3"
    },
    {
      id: 444444,
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

function displayMovieData(data) {
  for (index in data.movieData) {
    $("body").append(`<div class="row">
    <div class="col-3">
        <img src="${data.movieData[index].poster}">
    </div>
    <div class="col-3">
        <h3 class="movie-name">${data.movieData[index].title}</h3>
        <p class="movie-release-date">${data.movieData[index].release_date}</p>
    </div>
    <div class="col-3">
        <p class="movie-description">${data.movieData[index].overview}</p>
    </div>
    <div class="col-3">
        <button type="button" class="watchlist-btn">Add to watchlist</button>
    </div>
</div>`);
  }
}

function getAndDisplayMovieData() {
  getMovieData(displayMovieData);
}

var MOCK_TV_DATA = {
  tvData: [
    {
      id: 111111,
      poster: "/tv1.jpg",
      overview:
        "TV description 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "TV Title - 1",
      release_date: "2017-1-1"
    },
    {
      id: 222222,
      poster: "/tv2.jpg",
      overview:
        "TV description 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "TV Title - 2",
      release_date: "2017-2-2"
    },
    {
      id: 333333,
      poster: "/tv3.jpg",
      overview:
        "TV description 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "TV Title - 3",
      release_date: "2017-3-3"
    },
    {
      id: 444444,
      poster: "/tv4.jpg",
      overview:
        "TV description 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at",
      title: "TV Title - 4",
      release_date: "2017-4-4"
    }
  ]
};

function getTvData(callbackFn) {
  setTimeout(function() {
    callbackFn(MOCK_TV_DATA);
  }, 100);
}

function displayTvData(data) {
  for (index in data.tvData) {
    $("body").append(`<p>${data.tvData[index].title}</p>`);
  }
}

function getAndDisplayTvData() {
  getTvData(displayTvData);
}

$(document).ready(() => {
  getAndDisplayMovieData();
  getAndDisplayTvData();
});
