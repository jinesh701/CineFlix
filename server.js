const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const { PORT, DATABASE_URL } = require("./config");

mongoose.Promise = global.Promise;

const app = express();

app.use(morgan("common"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/search.html"));
});

app.get("/watchlist", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/watchlist.html"));
});

app.get("/watched", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/watched.html"));
});

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/registration.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/login.html"));
});

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
