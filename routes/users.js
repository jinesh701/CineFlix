"use strict";
const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//Bring in User Model
const User = require("../models/user");

//Register form
router.get("/register", (req, res) => {
  res.render("register", { title: "Register", Register: 'class="current"' });
});

//Register User
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

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
    const newUser = new User({
      username: username,
      password: password
    });

    newUser.username = username.substr(0, 1).toUpperCase() + username.substr(1);

    User.createUser(newUser, function(err, user) {
      if (err) {
        req.flash("error_msg", `Username already exists. Please try another.`);
        res.redirect("/users/register");
      } else {
        req.flash("success", "You are now registered and can log in");
        res.redirect(201, "/users/login");
      }
    });
  }
});

//Passport Local Strategy
passport.use(
  new LocalStrategy(function(username, password, done) {
    username = username.substr(0, 1).toUpperCase() + username.substr(1);
    User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: `The username ${username} was not found.`
        });
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Incorrect password. Please try again."
          });
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//Login
router.get("/login", (req, res) => {
  res.render("login", { title: "Login", Login: 'class="current"' });
});

//Login process
router.post("/login", (req, res, next) => {
  let username = req.body.username;
  username = username.substr(0, 1).toUpperCase() + username.substr(1);
  passport.authenticate("local", {
    successRedirect: "/profile/",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

//Logout process
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You are logged out");
  res.redirect("/users/login");
});

//Access control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "Please login to proceed");
    res.redirect("/users/login");
  }
}

module.exports = router;
