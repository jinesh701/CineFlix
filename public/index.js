//Redirect user to register
function redirectToRegister() {
  $(".landing-signup").on("click", function() {
    location.href = "/users/register";
  });
}

//Display now playing movies
function movieNowPlayingDisplay(data) {
  for (let i = 0; i <= 5; i++) {
    let title = data.results[i].title;
    let releaseDate = moment(data.results[i].release_date).format("LL");
    let poster = `https://image.tmdb.org/t/p/w185/${
      data.results[i].poster_path
    }`;
    let mobilePoster = `https://image.tmdb.org/t/p/w500/${
      data.results[i].backdrop_path
    }`;
    let movieId = data.results[i].id;
    $("#movies-now-playing").append(`<div class="col-2 landing-media">
          <a href="https://www.themoviedb.org/movie/${movieId}-${title}?language=en" target="_blank">
          <img class="landing-img" src="${poster}" alt="${title} poster">
          </a>
          <br>
          <b class="landing-title">${title}</b>
          <span class="landing-release-date">${releaseDate}</span>
      </div>
          </div>
          `);

    //Show add to watchlist if user logged in
    $("#movies-now-playing-logged-in").append(`<div class="col-2 landing-media">
          <a href="https://www.themoviedb.org/movie/${movieId}-${title}?language=en" target="_blank">
          <img class="landing-img" src="${poster}" alt="${title} poster">
          </a>
          <button type="button" class="landing-watchlist-btn col-12">Add to watchlist</button>
          <br>
          <b class="landing-title">${title}</b>
          <span class="landing-release-date">${releaseDate}</span>
      </div>
          </div>
          `);

    $("#mobile-now-playing").append(
      `<a href="https://www.themoviedb.org/movie/${movieId}-${title}?language=en">
      <img class="mobile-landing-img" src="${mobilePoster}" alt="${title} poster">
      </a>
      <b class="mobile-title">${title}</b>
      <span class="landing-release-date">${releaseDate}</span>`
    );

    //Show add to watchlist if user logged in
    $("#mobile-now-playing-logged-in").append(
      `<div class="mobile-landing-media">
      <img class="hide" src="${poster}">
      <a href="https://www.themoviedb.org/movie/${movieId}-${title}?language=en">
      <img class="mobile-landing-img" src="${mobilePoster}" alt="${title} poster">
      </a>
      <b class="mobile-title">${title}</b>
      <span class="landing-release-date">${releaseDate}</span>
      <br>
      <div class="col-2 mobile-watchlist-btn-container">
      <button type="button" class="mobile-landing-watchlist-btn">Add to watchlist</button>
      </div>
      </div>`
    );
  }
}

//Display upcoming movies
function movieUpcomingDisplay(data) {
  for (let i = 0; i <= 5; i++) {
    let title = data.results[i].title;
    let releaseDate = moment(data.results[i].release_date).format("LL");
    let poster = `https://image.tmdb.org/t/p/w185/${
      data.results[i].poster_path
    }`;
    let mobilePoster = `https://image.tmdb.org/t/p/w500/${
      data.results[i].backdrop_path
    }`;
    let movieId = data.results[i].id;
    $("#movies-upcoming").append(`<div class="col-2 landing-media">
          <a href="https://www.themoviedb.org/movie/${movieId}-${title}?language=en" target="_blank">
          <img class="landing-img" src="${poster}" alt="${title} poster">
          </a>
          <br>
          <b class="landing-title">${title}</b>
          <span class="landing-release-date">${releaseDate}</span>
      </div>`);

    //Show add to watchlist if user logged in
    $("#movies-upcoming-logged-in").append(`<div class="col-2 landing-media">
          <a href="https://www.themoviedb.org/movie/${movieId}-${title}?language=en" target="_blank">
          <img class="landing-img" src="${poster}" alt="${title} poster">
          </a>
          <button type="button" class="landing-watchlist-btn col-12">Add to watchlist</button>
          <br>
          <b class="landing-title">${title}</b>
          <span class="landing-release-date">${releaseDate}</span>
      </div>`);

    $("#mobile-upcoming").append(
      `<a href="https://www.themoviedb.org/movie/${movieId}-${title}?language=en">
      <img class="mobile-landing-img" src="${mobilePoster}" alt="${title} poster">
      </a>
      <b class="mobile-title">${title}</b>
      <span class="landing-release-date">${releaseDate}</span>`
    );

    //Show add to watchlist if user logged in
    $("#mobile-upcoming-logged-in").append(
      `<div class="mobile-landing-media">
      <img class="hide" src="${poster}">
      <a href="https://www.themoviedb.org/movie/${movieId}-${title}?language=en">
      <img class="mobile-landing-img" src="${mobilePoster}" alt="${title} poster">
      </a>
      <b class="mobile-title">${title}</b>
      <span class="landing-release-date">${releaseDate}</span>
      <br>
      <div class="col-2 mobile-watchlist-btn-container">
      <button type="button" class="mobile-landing-watchlist-btn">Add to watchlist</button>
      </div>
      </div>`
    );
  }
}

//Display popular tv shows
function tvPopularDisplay(data) {
  for (let i = 0; i <= 5; i++) {
    let name = data.results[i].name;
    let releaseDate = moment(data.results[i].first_air_date).format("LL");
    let poster = `https://image.tmdb.org/t/p/w185/${
      data.results[i].poster_path
    }`;
    let mobilePoster = `https://image.tmdb.org/t/p/w500/${
      data.results[i].backdrop_path
    }`;
    let tvId = data.results[i].id;
    $("#tv-popular").append(`<div class="col-2 landing-media">
          <a href="https://www.themoviedb.org/tv/${tvId}-${name}?language=en" target="_blank">
          <img class="landing-img" src="${poster}" alt="${name} poster">
          </a>
          <br>
          <b class="landing-title">${name}</b>
          <span class="landing-release-date">${releaseDate}</span>
      </div>`);

    //Show add to watchlist if user logged in
    $("#tv-popular-logged-in").append(`<div class="col-2 landing-media">
      <a href="https://www.themoviedb.org/tv/${tvId}-${name}?language=en" target="_blank">
      <img class="landing-img" src="${poster}" alt="${name} poster">
      </a>
      <button type="button" class="landing-watchlist-btn col-12">Add to watchlist</button>
      <br>
      <b class="landing-title">${name}</b>
      <span class="landing-release-date">${releaseDate}</span>
  </div>`);

    $("#mobile-popular").append(
      `<a href="https://www.themoviedb.org/tv/${tvId}-${name}?language=en">
      <img class="mobile-landing-img" src="${mobilePoster}" alt="${name} poster">
      </a>
      <b class="mobile-title">${name}</b>
      <span class="landing-release-date">${releaseDate}</span>`
    );

    //Show add to watchlist if user logged in
    $("#mobile-popular-logged-in").append(
      `<div class="mobile-landing-media">
      <img class="hide" src="${poster}">
      <a href="https://www.themoviedb.org/tv/${tvId}-${name}?language=en">
      <img class="mobile-landing-img" src="${mobilePoster}" alt="${name} poster">
      </a>
      <b class="mobile-title">${name}</b>
      <span class="landing-release-date">${releaseDate}</span>
      <br>
      <div class="col-2 mobile-watchlist-btn-container">
      <button type="button" class="mobile-landing-watchlist-btn">Add to watchlist</button>
      </div>
      </div>`
    );
  }
}

//Display top rated tv shows
function tvTopRatedDisplay(data) {
  for (let i = 0; i <= 5; i++) {
    let name = data.results[i].name;
    let releaseDate = moment(data.results[i].first_air_date).format("LL");
    let poster = `https://image.tmdb.org/t/p/w185/${
      data.results[i].poster_path
    }`;
    let mobilePoster = `https://image.tmdb.org/t/p/w500/${
      data.results[i].backdrop_path
    }`;
    let tvId = data.results[i].id;
    $("#tv-top-rated").append(`<div class="col-2 landing-media">
          <a href="https://www.themoviedb.org/tv/${tvId}-${name}?language=en" target="_blank">
          <img class="landing-img" src="${poster}" alt="${name} poster">
          </a>
          <br>
          <b class="landing-title">${name}</b>
          <span class="landing-release-date">${releaseDate}</span>
      </div>`);

    //Show add to watchlist if user logged in
    $("#tv-top-rated-logged-in").append(`<div class="col-2 landing-media">
          <a href="https://www.themoviedb.org/tv/${tvId}-${name}?language=en" target="_blank">
          <img class="landing-img" src="${poster}" alt="${name} poster">
          </a>
          <button type="button" class="landing-watchlist-btn col-12">Add to watchlist</button>
          <br>
          <b class="landing-title">${name}</b>
          <span class="landing-release-date">${releaseDate}</span>
      </div>`);

    $("#mobile-top-rated")
      .append(`<a href="https://www.themoviedb.org/tv/${tvId}-${name}?language=en">
    <img class="mobile-landing-img" src="${mobilePoster}" alt="${name} poster">
    </a>
    <b class="mobile-title">${name}</b>
    <span class="landing-release-date">${releaseDate}</span>`);

    //Show add to watchlist if user logged in
    $("#mobile-top-rated-logged-in").append(`<div class="mobile-landing-media">
      <img class="hide" src="${poster}">
      <a href="https://www.themoviedb.org/tv/${tvId}-${name}?language=en">
      <img class="mobile-landing-img" src="${mobilePoster}" alt="${name} poster">
      </a>
      <b class="mobile-title">${name}</b>
      <span class="landing-release-date">${releaseDate}</span>
      <br>
      <div class="col-2 mobile-watchlist-btn-container">
      <button type="button" class="mobile-landing-watchlist-btn">Add to watchlist</button>
      </div>
      </div>`);
  }
}

//Display movie data
function displayMovieData(data) {
  if (data.total_results === 0) {
    $(".js-no-movie-results").show();
  }
  for (index in data.results) {
    let poster = `https://image.tmdb.org/t/p/w185/${
      data.results[index].poster_path
    }`;
    if (data.results[index].poster_path === null) {
      poster = "https://via.placeholder.com/185x260";
    }
    let overview = "";
    if (data.results[index].overview === "") {
      overview = "No overview was found";
    } else {
      overview = `${data.results[index].overview}`;
    }
    let releaseDate = moment(data.results[index].release_date).format("LL");
    if (data.results[index].release_date === "") {
      releaseDate = "No release date was found";
    }
    $(".js-search-results").append(`
    <div class="row">
    <div class="search-result card card-1">
      <div class="col-3">
          <img src="${poster}" alt="${data.results[index].title} poster">
      </div>
      <div class="col-3 title-release-container">
          <h3 class="result-name">${data.results[index].title}</h3>
          <p class="result-release-date">${releaseDate}</p>
      </div>
      <div class="col-4 overview-container">
          <p class="result-description">${overview}</p>
      </div>
      <div class="col-12 watchlist-btn-container">
          <button type="button" class="watchlist-btn">Add to watchlist</button>
      </div>
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
    let poster = `https://image.tmdb.org/t/p/w185/${
      data.results[index].poster_path
    }`;
    if (data.results[index].poster_path === null) {
      poster = "https://via.placeholder.com/185x260";
    }
    if (data.results[index].overview === "") {
      overview = "No overview was found";
    } else {
      overview = `${data.results[index].overview}`;
    }
    let releaseDate = moment(data.results[index].first_air_date).format("LL");
    if (data.results[index].first_air_date === "") {
      releaseDate = "No release date was found";
    }
    $(".js-search-results").append(`<div class="row">
    <div class="search-result card card-1">
      <div class="col-3">
          <img src="${poster}" alt="${data.results[index].name} poster">
      </div>
      <div class="col-3 title-release-container">
          <h3 class="result-name">${data.results[index].name}</h3>
          <p class="result-release-date">${releaseDate}</p>
      </div>
      <div class="col-4 overview-container">
          <p class="result-description">${overview}</p>
      </div>
      <div class="col-12 watchlist-btn-container">
          <button type="button" class="watchlist-btn">Add to watchlist</button>
      </div>
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

//Add landing page movies/tv shows to database
function addItemFromLanding() {
  $("body").on("click", ".landing-watchlist-btn", function(event) {
    event.preventDefault();
    let poster = $(this)
      .closest(".landing-media")
      .find("img")
      .attr("src");
    let title = $(this)
      .closest(".landing-media")
      .find(".landing-title")
      .text();
    let release_date = $(this)
      .closest(".landing-media")
      .find(".landing-release-date")
      .text();
    let newMedia = {
      poster: poster,
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

//Add landing page movies/tv shows to database from mobile
function addItemFromLandingMobile() {
  $("body").on("click", ".mobile-landing-watchlist-btn", function(event) {
    event.preventDefault();
    let poster = $(this)
      .closest(".mobile-landing-media")
      .find("img")
      .attr("src");
    let title = $(this)
      .closest(".mobile-landing-media")
      .find(".mobile-title")
      .text();
    let release_date = $(this)
      .closest(".mobile-landing-media")
      .find(".landing-release-date")
      .text();
    let newMedia = {
      poster: poster,
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

//Add tv show/movie to database
function addItemToDb() {
  $("body").on("click", ".watchlist-btn", function(event) {
    event.preventDefault();
    let poster = $(this)
      .closest(".search-result")
      .find("img")
      .attr("src");
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
      .closest(".result-container-watched")
      .find(".watched-title")
      .text();
    let id = $(this)
      .closest(".result-container-watched")
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
  redirectToRegister();
  getLandingMovies(movieNowPlayingDisplay, movieUpcomingDisplay);
  getLandingTv(tvPopularDisplay, tvTopRatedDisplay);
  addItemFromLanding();
  addItemFromLandingMobile();
  handleSubmit();
  addItemToDb();
  removeItemFromDb();
  markItemAsWatched();
  removeItemFromWatched();
});
