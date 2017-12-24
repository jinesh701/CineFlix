"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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
        newUser.firstName =
          newUser.firstName.substr(0, 1).toUpperCase() +
          newUser.firstName.substr(1);
        newUser.password = hash;
        newUser.save(function(err) {
          if (err) {
            req.flash(
              "error_msg",
              `Username ${newUser.username} already exists. Please try another.`
            );
            res.redirect("/users/register");
          } else {
            req.flash("success", "You are now registered and can log in");
            res.redirect("/users/login");
          }
        });
      });
    });
  }
});

//Passport Local Strategy
passport.use(
  new LocalStrategy(function(username, password, done) {
    //Match user
    let query = { username: username };
    User.findOne(query, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: `Username: ${username} was not found`
        });
      }
      //Match Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
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
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//Login
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

//Login process
router.post("/login", (req, res, next) => {
  const username = req.body.username;
  passport.authenticate("local", {
    successRedirect: "/profile/" + username,
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

router.post("/authenticate", (req, res) => {
  res.send("authenticate");
});

module.exports = router;
