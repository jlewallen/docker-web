var http = require("http");
var _ = require("../public/js/lib/underscore");
var configuration = require("../config.js").docker;

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
  function call(options, returnsJson, end) {
    return http.request(_.extend(options, configuration), function(res) {
      var body = "";
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        body += chunk;
      });
      res.on('end', function(){
        end(returnsJson ? reformat(JSON.parse(body)) : body);
      });
    });
  };

  this.get = function(path, returnsJson, end) {
    call({ path: path, method: 'GET' }, returnsJson, end).end();
  };

  this.post = function(path, returnsJson, end, body) {
    var req = call({ path: path, method: 'POST' }, returnsJson, end);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  };

  this.del = function(path, returnsJson, end) {
    call({ path: path, method: 'DELETE' }, returnsJson, end).end();
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

exports.createContainerFromImage = function(id, settings, callback) {
  var container = {
     "Hostname": "",
     "User": "",
     "Memory": 0,
     "MemorySwap": 0,
     "AttachStdin": false,
     "AttachStdout": true,
     "AttachStderr": true,
     "PortSpecs": null,
     "Tty": false,
     "OpenStdin": false,
     "StdinOnce": false,
     "Env": null,
     "Cmd":[
             "date"
     ],
     "Dns": null,
     "Image": id,
     "Volumes": {},
     "VolumesFrom": ""
  };
  docker.post("/containers/create", true, callback, container);
};

exports.containerLogs = function(id, callback) {
  docker.post("/containers/" + id + "/attach?logs=1&stream=0&stdout=1&stderr=1", false, callback);
};
