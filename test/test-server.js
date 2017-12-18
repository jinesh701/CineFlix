"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, runServer, closeServer } = require("../server");

const should = chai.should();

chai.use(chaiHttp);

describe("CineFlix app", function() {
  before(function() {
    return runServer();
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
      .get("/search.html")
      .then(function(res) {
        res.should.have.status(200);
      });
  });

  it("watchlist page should have status 200", function() {
    return chai
      .request(app)
      .get("/watchlist.html")
      .then(function(res) {
        res.should.have.status(200);
      });
  });

  it("watched page should have status 200", function() {
    return chai
      .request(app)
      .get("/watched.html")
      .then(function(res) {
        res.should.have.status(200);
      });
  });
});
