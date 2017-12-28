//Display now playing movies
function movieNowPlayingDisplay(data) {
  for (let i = 0; i <= 5; i++) {
    let title = data.results[i].title;
    let poster = `http://image.tmdb.org/t/p/w185/${
      data.results[i].poster_path
    }`;
    $("#movies-now-playing").append(`<div class="col-2">
          <img class="landing-img" src="${poster}">
          <b>${title}</b>
      </div>`);
  }
}

//Display upcoming movies
function movieUpcomingDisplay(data) {
  for (let i = 0; i <= 5; i++) {
    let title = data.results[i].title;
    let poster = `http://image.tmdb.org/t/p/w185/${
      data.results[i].poster_path
    }`;
    $("#movies-upcoming").append(`<div class="col-2">
          <img class="landing-img" src="${poster}">
          <b>${title}</b>
      </div>`);
  }
}

//Display popular tv shows
function tvPopularDisplay(data) {
  for (let i = 0; i <= 5; i++) {
    let name = data.results[i].name;
    let poster = `http://image.tmdb.org/t/p/w185/${
      data.results[i].poster_path
    }`;
    $("#tv-popular").append(`<div class="col-2">
          <img class="landing-img" src="${poster}">
          <b>${name}</b>
      </div>`);
  }
}

//Display top rated tv shows
function tvTopRatedDisplay(data) {
  for (let i = 0; i <= 5; i++) {
    let name = data.results[i].name;
    let poster = `http://image.tmdb.org/t/p/w185/${
      data.results[i].poster_path
    }`;
    $("#tv-top-rated").append(`<div class="col-2">
          <img class="landing-img" src="${poster}">
          <b>${name}</b>
      </div>`);
  }
}

//Display movie data
function displayMovieData(data) {
  if (data.total_results === 0) {
    $(".js-no-movie-results").show();
  }
  for (index in data.results) {
    let poster = `http://image.tmdb.org/t/p/w185/${
      data.results[index].poster_path
    }`;
    if (data.results[index].poster_path === null) {
      poster = "http://via.placeholder.com/185x260";
    }
    $("body").append(`<div class="row search-result">
      <div class="col-3">
          <img src="${poster}">
      </div>
      <div class="col-3">
          <h3 class="result-name">${data.results[index].title}</h3>
          <p class="result-release-date">${data.results[index].release_date}</p>
      </div>
      <div class="col-3">
          <p class="result-description">${data.results[index].overview}</p>
      </div>
      <div class="col-3">
          <button type="button" class="watchlist-btn">Add to watchlist</button>
      </div>
  </div>`);
  }
}

//Display tv data
function displayTvData(data) {
  if (data.total_results === 0) {
    $(".js-no-tv-results").show();
  }
  for (index in data.results) {
    let poster = `http://image.tmdb.org/t/p/w185/${
      data.results[index].poster_path
    }`;
    if (data.results[index].poster_path === null) {
      poster = "http://via.placeholder.com/185x260";
    }
    $("body").append(`<div class="row search-result">
      <div class="col-3">
          <img src="${poster}">
      </div>
      <div class="col-3">
          <h3 class="result-name">${data.results[index].name}</h3>
          <p class="result-release-date">${
            data.results[index].first_air_date
          }</p>
      </div>
      <div class="col-3">
          <p class="result-description">${data.results[index].overview}</p>
      </div>
      <div class="col-3">
          <button type="button" class="watchlist-btn">Add to watchlist</button>
      </div>
  </div>`);
  }
}

//Submit user input for tv show/movie search
function handleSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find(".js-user-input");
    const query = $(queryTarget).val();
    queryTarget.val("");
    getMovieInfo(query, displayMovieData);
    getTvInfo(query, displayTvData);
    $(".search-result").remove();
    $(".js-no-movie-results").hide();
    $(".js-no-tv-results").hide();
  });
}

//Add tv show/movie to database
function addItemToDb() {
  $("body").on("click", ".watchlist-btn", function(event) {
    event.preventDefault();
    let poster = $(this)
      .closest(".search-result")
      .find("img")
      .attr("src");
    let overview = $(this)
      .closest(".search-result")
      .find(".result-description")
      .text();
    let title = $(this)
      .closest(".search-result")
      .find(".result-name")
      .text();
    let release_date = $(this)
      .closest(".search-result")
      .find(".result-release-date")
      .text();
    let newMedia = {
      poster: poster,
      overview: overview,
      title: title,
      release_date: release_date
    };
    $.ajax({
      url: "/media/watchlist",
      data: newMedia,
      type: "POST",
      dataType: "json"
    }).done(function(data) {
      window.location.href = data.redirect;
    });
  });
}

//Remove tv show/movie from database
function removeItemFromDb() {
  $("body").on("click", "#deleteItem", function() {
    let title = $(this)
      .closest(".result-container")
      .find(".hide")
      .text();
    let id = $(this)
      .closest(".result-container")
      .attr("id");
    let data_test = {
      id: id,
      title: title
    };
    $.ajax({
      url: "/media/watchlist/" + id,
      data: data_test,
      type: "DELETE"
    }).done(function(data) {
      window.location.href = data.redirect;
    });
  });
}

//Mark tv show/movie as watched
function markItemAsWatched() {
  $("body").on("click", "#watchedItem", function() {
    let title = $(this)
      .closest(".result-container")
      .find(".hide")
      .text();
    let id = $(this)
      .closest(".result-container")
      .attr("id");
    let data_test = {
      id: id,
      title: title
    };
    $.ajax({
      url: "/media/watchlist/" + id,
      data: data_test,
      type: "PUT"
    }).done(function(data) {
      window.location.href = data.redirect;
    });
  });
}

//Remove tv show/movie from database
function removeItemFromWatched() {
  $("body").on("click", "#deleteItemFromWatched", function() {
    let title = $(this)
      .closest(".result-container")
      .find(".watched-title")
      .text();
    let id = $(this)
      .closest(".result-container")
      .attr("id");
    let data_test = {
      id: id,
      title: title
    };
    $.ajax({
      url: "/media/watched/" + id,
      data: data_test,
      type: "DELETE"
    }).done(function(data) {
      window.location.href = data.redirect;
    });
  });
}

$(document).ready(() => {
  getLandingMovies(movieNowPlayingDisplay, movieUpcomingDisplay);
  getLandingTv(tvPopularDisplay, tvTopRatedDisplay);
  handleSubmit();
  addItemToDb();
  removeItemFromDb();
  markItemAsWatched();
  removeItemFromWatched();
});
