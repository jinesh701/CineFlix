"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();

const { app, runServer, closeServer } = require("../server");
const { TEST_DATABASE_URL } = require("../config");

chai.use(chaiHttp);

describe("CineFlix app", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });

  it("index page should have status 200", function() {
    return chai
      .request(app)
      .get("/")
      .then(function(res) {
        res.should.have.status(200);
      });
  });

  it("search page should have status 200", function() {
    return chai
      .request(app)
      .get("/users/login")
      .then(function(res) {
        res.should.have.status(200);
      });
  });

  it("watchlist page should have status 200", function() {
    return chai
      .request(app)
      .get("/users/register")
      .then(function(res) {
        res.should.have.status(200);
      });
  });
});
