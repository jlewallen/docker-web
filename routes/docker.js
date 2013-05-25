var http = require("http");
var _ = require("../public/js/lib/underscore");

function reformat(json) {
  if (_.isArray(json)) {
    return _.map(json, function(value) {
      return reformat(value);
    });
  }
  else if (_.isObject(json)) {
    return _.object(_.map(json, function(value, key) {
      return [ _.isString(key) ? (key.charAt(0).toLowerCase() + key.slice(1)) : key, reformat(value) ];
    }));
  }
  else {
    return json;
  }
}

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
        end(reformat(JSON.parse(body)));
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

exports.container = function(id, callback) {
  docker.get("/containers/" + id + "/json", callback);
};
