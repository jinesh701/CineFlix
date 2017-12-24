"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//Bring in User Model
const User = require("../models/user");

//Register form
router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

//Register User
router.post("/register", (req, res) => {
  const firstName = req.body.firstName;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody("firstName", "First name is required").notEmpty();
  req.checkBody("username", "Username is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  req
    .checkBody("password2", "Passwords do not match")
    .equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render("register", {
      errors: errors
    });
  } else {
    let newUser = new User({
      firstName: firstName,
      username: username,
      password: password
    });
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err) {
          if (err) {
            console.log(err);
            return;
          } else {
            req.flash("success", "You are now registered and can log in");
            res.redirect("/users/login");
          }
        });
      });
    });
  }
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/authenticate", (req, res) => {
  res.send("authenticate");
});

router.get("/profile/:username", (req, res) => {
  res.render("profile", { username: req.params.username });
});

module.exports = router;
