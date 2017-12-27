function displayMovieData(data) {
  for (index in data.movieData) {
    $("body").append(`<div class="row">
      <div class="col-3">
          <img src="${data.movieData[index].poster}">
      </div>
      <div class="col-3">
          <h3 class="movie-name">${data.movieData[index].title}</h3>
          <p class="movie-release-date">${
            data.movieData[index].release_date
          }</p>
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

function handleSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find(".js-user-input");
    const query = $(queryTarget).val();
    getMovieInfo(query, getAndDisplayMovieData);
  });
}

//Add movie to database
function addMovieToDb() {
  $("body").on("click", ".watchlist-btn", function(event) {
    event.preventDefault();
    let details = $(this)
      .parent()
      .parent()
      .parent()
      .parent();
    let poster = details.find("img").attr("src");
    let overview = details.find(".movie-description").text();
    let title = details.find(".movie-name").text();
    let release_date = details.find(".movie-release-date").text();
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

$(document).ready(() => {
  handleSubmit();
  addMovieToDb();
});
