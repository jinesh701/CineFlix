"use strict";
const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

//Search page
router.get("/search", ensureAuthenticated, (req, res) => {
  res.render("search", { title: "Search" });
});

//Watchlist page
router.get("/watchlist", ensureAuthenticated, (req, res) => {
  Movie.find({ watched: false })
    .then(movies => {
      res.render("watchlist", { movies, title: "Watchlist" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "No movies found" });
    });
});

//Watched page
router.get("/watched", ensureAuthenticated, (req, res) => {
  Movie.find({ watched: true })
    .then(movies => {
      res.render("watched", { movies, title: "Watched" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "No movies found" });
    });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "Please login");
    res.redirect("/users/login");
  }
}

//Adding a movie to watchlist
router.post("/watchlist", jsonParser, (req, res) => {
  const newMovie = Movie.create({
    poster: req.body.poster,
    overview: req.body.overview,
    title: req.body.title,
    release_date: req.body.release_date
  })
    .then(() => {
      req.flash("success", "Your movie has been added to your watchlist");
      res.send({ redirect: "/movies/watchlist" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//Remove a movie from watchlist
router.delete("/watchlist/:id", (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      req.flash("success", "Movie has been removed from your watchlist");
      res.status(200).send({ redirect: "/movies/watchlist" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

//Mark a movie as watched
router.put("/watchlist/:id", (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, {
    watched: true
  })
    .then(() => {
      req.flash("success", "Your movie has been added to your watched list");
      res.status(200).send({ redirect: "/movies/watched" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

//Remove a movie from watched list
router.delete("/watched/:id", (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      req.flash(
        "success",
        "Your movie has been removed from your watched list"
      );
      res.status(200).send({ redirect: "/movies/watched" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
