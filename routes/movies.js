"use strict";
const express = require("express");
const router = express.Router();

//Search page
router.get("/search", ensureAuthenticated, (req, res) => {
  res.render("search", { title: "Search" });
});

//Watchlist page
router.get("/watchlist", ensureAuthenticated, (req, res) => {
  res.render("watchlist", { title: "Watchlist" });
});

//Watched page
router.get("/watched", ensureAuthenticated, (req, res) => {
  res.render("watched", { title: "Watched" });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "Please login");
    res.redirect("/users/login");
  }
}

module.exports = router;
