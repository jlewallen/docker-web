
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api');

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/info', api.info);
app.get('/api/images', api.images);
app.post('/api/images/search', api.searchImages);
app.get('/api/images/:id', api.image);
app.post('/api/images/:id/create-container', api.createContainerFromImage);
app.get('/api/containers', api.containers);
app.get('/api/containers/:id', api.container);
app.post('/api/containers/:id/start', api.startContainer);
app.post('/api/containers/:id/stop', api.stopContainer);
app.post('/api/containers/:id/restart', api.restartContainer);
app.post('/api/containers/:id/remove', api.removeContainer);
app.get('/api/containers/:id/logs', api.containerLogs);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
