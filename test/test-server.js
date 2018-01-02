"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");

const should = chai.should();

const { app, runServer, closeServer } = require("../server");
const { TEST_DATABASE_URL } = require("../config");
const User = require("../models/user");
const Media = require("../models/media");

chai.use(chaiHttp);

function tearDownDb() {
  console.warn("Deleting database");
  return mongoose.connection.dropDatabase();
}

describe("CineFlix app", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL)
      .then(console.log("Running Server"))
      .catch(err =>
        console.log({
          err
        })
      );
  });

  after(function() {
    return tearDownDb();
    return closeServer();
  });

  describe("Index Page", function() {
    it("Should have status 200", function() {
      return chai
        .request(app)
        .get("/")
        .then(function(res) {
          res.should.have.status(200);
        });
    });

    describe("Register Page", function() {
      it("Should have status 200", function() {
        return chai
          .request(app)
          .get("/users/register")
          .then(function(res) {
            res.should.have.status(200);
          });
      });
    });

    describe("Register POST", function() {
      const newUser = {
        username: "Movies",
        password: "test",
        password2: "test"
      };
      it("Should create a new user", function() {
        return chai
          .request(app)
          .post("/users/register")
          .send(newUser)
          .then(function(res) {
            console.log(res.request._data);
            res.should.have.status(201);
            return User.findOne({ username: newUser.username });
          })
          .then(function(user) {
            console.log(user);
            user.username.should.equal(newUser.username);
          });
      });
    });

    describe("Login Page", function() {
      it("Should have status 200", function() {
        return chai
          .request(app)
          .get("/users/login")
          .then(function(res) {
            res.should.have.status(200);
          });
      });
      describe("Login POST", function() {
        const newUser = {
          username: "Movies",
          password: "test"
        };
        it("Should redirect to profile page", function() {
          return chai
            .request(app)
            .post("/users/login")
            .send(newUser)
            .then(function(res) {
              res.should.have.status(200);
            });
        });
      });
    });
  });
});
