/**
 *
 */
var http = require("http");
var docker = require("./docker");

exports.images = function(req, response) {
  docker.images(function(body) {
    response.json(body);
  });
};

exports.containers = function(req, response) {
  docker.containers(function(body) {
    response.json(body);
  });
};
