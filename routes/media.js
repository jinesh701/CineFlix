"use strict";
const express = require("express");
const router = express.Router();
const Media = require("../models/media");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

//Search page
router.get("/search", ensureAuthenticated, (req, res) => {
  res.render("search", { title: "Search" });
});

//Watchlist page
router.get("/watchlist", ensureAuthenticated, (req, res) => {
  Media.find({ watched: false })
    .then(media => {
      res.render("watchlist", { media, title: "Watchlist" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "No movies or shows found" });
    });
});

//Watched page
router.get("/watched", ensureAuthenticated, (req, res) => {
  Media.find({ watched: true })
    .then(media => {
      res.render("watched", { media, title: "Watched" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "No movies or shows found" });
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

//Adding a tv show/movie to watchlist
router.post("/watchlist", jsonParser, (req, res) => {
  const newMedia = Media.create({
    poster: req.body.poster,
    overview: req.body.overview,
    title: req.body.title,
    release_date: req.body.release_date
  })
    .then(() => {
      req.flash(
        "success",
        `${req.body.title} has been added to your watchlist`
      );
      res.send({ redirect: "/media/watchlist" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//Remove a tv show/movie from watchlist
router.delete("/watchlist/:id", (req, res) => {
  Media.findByIdAndRemove(req.params.id)
    .then(() => {
      req.flash(
        "success",
        `${req.body.title} has been removed from your watchlist`
      );
      res.status(200).send({ redirect: "/media/watchlist" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

//Mark a tv show/movie as watched
router.put("/watchlist/:id", (req, res) => {
  Media.findByIdAndUpdate(req.params.id, {
    watched: true
  })
    .then(() => {
      req.flash("success", `You have marked ${req.body.title} as watched`);
      res.status(200).send({ redirect: "/media/watched" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

//Remove a tv show/movie from watched list
router.delete("/watched/:id", (req, res) => {
  Media.findByIdAndRemove(req.params.id)
    .then(() => {
      req.flash(
        "success",
        `${req.body.title} has been removed from your watched list`
      );
      res.status(200).send({ redirect: "/media/watched" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
