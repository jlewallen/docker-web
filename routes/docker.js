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
  var globalOptions = {
    host: '192.168.0.127',
    port: '4243',
  };

  function call(options, returnsJson, end) {
    http.request(_.extend(options, globalOptions), function(res) {
      var body = "";
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        body += chunk;
      });
      res.on('end', function(){
        end(returnsJson ? reformat(JSON.parse(body)) : body);
      });
    }).end();
  };

  this.get = function(path, returnsJson, end) {
    call({ path: path, method: 'GET' }, returnsJson, end);
  };

  this.post = function(path, returnsJson, end) {
    call({ path: path, method: 'POST' }, returnsJson, end);
  };

  this.del = function(path, returnsJson, end) {
    call({ path: path, method: 'DELETE' }, returnsJson, end);
  };
}

var docker = new Docker();

exports.images = function(callback) {
  docker.get("/images/json", true, callback);
};

exports.image = function(id, callback) {
  docker.get("/images/" + id + "/json", true, callback);
};

exports.containers = function(callback) {
  docker.get("/containers/ps?all=1", true, callback);
};

exports.container = function(id, callback) {
  docker.get("/containers/" + id + "/json", true, callback);
};

exports.restartContainer = function(id, callback) {
  docker.post("/containers/" + id + "/restart", false, callback);
};

exports.startContainer = function(id, callback) {
  docker.post("/containers/" + id + "/start", false, callback);
};

exports.stopContainer = function(id, callback) {
  docker.post("/containers/" + id + "/stop", false, callback);
};

exports.removeContainer = function(id, callback) {
  docker.del("/containers/" + id, false, callback);
};

exports.info = function(callback) {
  docker.get('/info', true, callback);
};

exports.searchImages = function(term, callback) {
  docker.get('/images/search?term=' + term, true, callback);
};
