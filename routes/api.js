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

exports.image = function(req, response) {
  docker.image(req.params.id, function(body) {
    response.json(body);
  });
};

exports.containers = function(req, response) {
  docker.containers(function(body) {
    response.json(body);
  });
};

exports.container = function(req, response) {
  docker.container(req.params.id, function(body) {
    response.json(body);
  });
};

exports.startContainer = function(req, response) {
  docker.startContainer(req.params.id, function(body) {
    response.json(body);
  });
};

exports.stopContainer = function(req, response) {
  docker.stopContainer(req.params.id, function(body) {
    response.json(body);
  });
};

exports.restartContainer = function(req, response) {
  docker.restartContainer(req.params.id, function(body) {
    response.json(body);
  });
};

exports.removeContainer = function(req, response) {
  docker.removeContainer(req.params.id, function(body) {
    response.json(body);
  });
};
