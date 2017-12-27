function displayMovieData(data) {
  console.log(data);
  for (index in data.results) {
    let poster = `http://image.tmdb.org/t/p/w185/${
      data.results[index].poster_path
    }`;
    console.log(poster);
    if (data.results[index].poster_path === null) {
      poster = "http://via.placeholder.com/185x260";
    }
    $("body").append(`<div class="row movie-result">
      <div class="col-3">
          <img src="${poster}">
      </div>
      <div class="col-3">
          <h3 class="movie-name">${data.results[index].title}</h3>
          <p class="movie-release-date">${data.results[index].release_date}</p>
      </div>
      <div class="col-3">
          <p class="movie-description">${data.results[index].overview}</p>
      </div>
      <div class="col-3">
          <button type="button" class="watchlist-btn">Add to watchlist</button>
      </div>
  </div>`);
  }
}

//Submit user input for movie search
function handleSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find(".js-user-input");
    const query = $(queryTarget).val();
    queryTarget.val("");
    getMovieInfo(query, displayMovieData);
    $(".movie-result").empty();
  });
}

//Add movie to database
function addMovieToDb() {
  $("body").on("click", ".watchlist-btn", function(event) {
    event.preventDefault();
    let poster = $(this)
      .closest(".movie-result")
      .find("img")
      .attr("src");
    let overview = $(this)
      .closest(".movie-result")
      .find(".movie-description")
      .text();
    let title = $(this)
      .closest(".movie-result")
      .find(".movie-name")
      .text();
    let release_date = $(this)
      .closest(".movie-result")
      .find(".movie-release-date")
      .text();
    let newMovie = {
      poster: poster,
      overview: overview,
      title: title,
      release_date: release_date
    };
    $.ajax({
      url: "/movies/watchlist",
      data: newMovie,
      type: "POST",
      dataType: "json"
    }).done(function(data) {
      window.location.href = data.redirect;
    });
  });
}

//Remove movie from database
function removeMovieFromDb() {
  $("body").on("click", "#deleteMovie", function() {
    let id = $(this)
      .closest(".movie-container")
      .attr("id");
    $.ajax({
      url: "/movies/watchlist/" + id,
      data: id,
      type: "DELETE"
    }).done(function(data) {
      window.location.href = data.redirect;
    });
  });
}

//Mark movie as watched
function markMovieAsWatched() {
  $("body").on("click", "#watchedMovie", function() {
    let id = $(this)
      .closest(".movie-container")
      .attr("id");
    $.ajax({
      url: "/movies/watchlist/" + id,
      data: id,
      type: "PUT"
    }).done(function(data) {
      window.location.href = data.redirect;
    });
  });
}

//Remove movie from database
function removeMovieFromWatched() {
  $("body").on("click", "#deleteMovieFromWatched", function() {
    let id = $(this)
      .closest(".movie-container")
      .attr("id");
    $.ajax({
      url: "/movies/watched/" + id,
      data: id,
      type: "DELETE"
    }).done(function(data) {
      window.location.href = data.redirect;
    });
  });
}

$(document).ready(() => {
  handleSubmit();
  addMovieToDb();
  removeMovieFromDb();
  markMovieAsWatched();
  removeMovieFromWatched();
});
