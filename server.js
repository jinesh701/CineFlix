"use strict";
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const hbs = require("express-handlebars");
const expressValidator = require("express-validator");

const { PORT, DATABASE_URL } = require("./config");
const routes = require("./routes/index");
const users = require("./routes/users");
const movies = require("./routes/movies");

mongoose.Promise = global.Promise;

const app = express();

//Set view engine
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts"
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//Logging
app.use(morgan("common"));

//Cors
app.use(cors());

//Set static folder
app.use(express.static("public"));

// Express Session
app.use(
  session({
    secret: "ldalladlaflasaj",
    saveUninitialized: true,
    resave: true
  })
);

//Express Validator
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      let namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Cookie parser
app.use(cookieParser());

//Set routes
app.use("/", routes);
app.use("/users", users);
app.use("/movies", movies);

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on("error", err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.log(err));
}

module.exports = { app, runServer, closeServer };
