"use strict";
const express = require("express");
const router = express.Router();

//Index page
router.get("/", (req, res) => {
  res.render("index", { title: "CineFlix" });
});

//Profile page
router.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("profile", { title: req.params.username });
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
