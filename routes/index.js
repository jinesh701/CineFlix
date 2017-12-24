"use strict";
const express = require("express");
const router = express.Router();

//Index page
router.get("/", (req, res) => {
  res.render("index", { title: "CineFlix" });
});

//Profile page
router.get("/profile/:username", (req, res) => {
  res.render("profile", { username: req.params.username });
});

module.exports = router;
