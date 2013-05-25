var http = require("http");
var _ = require("./underscore");

function Docker() {
  var options = {
    host: '192.168.0.127',
    port: '4243',
  };

  this.get = function(path, end) {
    http.get(_.extend({ path: path }, options), function(res) {
      var body = "";
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        body += chunk;
      });
      res.on('end', function(){
        end(JSON.parse(body));
      });
    });
  }
}

var docker = new Docker();

exports.images = function(callback) {
  docker.get("/images/json", callback);
};

exports.containers = function(callback) {
  docker.get("/containers/ps?all=1", callback);
};
