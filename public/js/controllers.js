'use strict';

function AppCtrl($scope, $http) {

}

function ImagesCtrl($scope, $http) {
  $scope.model = null;
  $http.get('/api/images').success(function(data) {
    $scope.model = _.map(data, function(image) {
      return _.extend(image, { created: image.created * 1000 });
    });
  });
}

function ContainersCtrl($scope, $http) {
  $scope.model = null;
  $http.get('/api/containers').success(function(data) {
    $scope.model = _.map(data, function(container) {
      return _.extend(container, { created: container.created * 1000 });
    });
  });
}

function ContainerCtrl($scope, $http, $routeParams, $location) {
  $scope.model = null;
  $http.get('/api/containers/' + $routeParams.id).success(function(data) {
    $scope.model = data;
  });
  function call(url) {
    $scope.busy = true;
    return $http.post(url).success(function(data) {
      $scope.busy = false;
    });
  };

  $scope.start = function() {
    call('/api/containers/' + $routeParams.id + '/start');
  };

  $scope.stop = function() {
    call('/api/containers/' + $routeParams.id + '/stop');
  };

  $scope.restart = function() {
    call('/api/containers/' + $routeParams.id + '/restart');
  };

  $scope.remove = function() {
    call('/api/containers/' + $routeParams.id + '/remove').success(function() {
      $location.path("/containers");
    });
  };

  $scope.showLogs = function() {
    $scope.busy = true;
    return $http.get('/api/containers/' + $routeParams.id + '/logs').success(function(data) {
      $scope.busy = false;
      $scope.model.logs = data;
    });
  };
}

function ImageCtrl($scope, $http, $routeParams, $location) {
  $scope.model = null;
  $http.get('/api/images/' + $routeParams.id).success(function(data) {
    $scope.model = data;
  });

  $scope.createContainer = function() {
    $scope.busy = true;
    $http.post('/api/images/' + $routeParams.id + '/create-container').success(function(data) {
      $scope.busy = false;
      $location.path("/containers/" + data.id);
    });
  };
}

function CreateContainerCtrl($scope, $http) {
  $scope = model;
}

function AboutCtrl($scope, $http) {
  $scope.model = null;
  $http.get('/api/info').success(function(data) {
    $scope.model = data;
  });
}

function SearchCtrl($scope, $http) {
  $scope.model = null;
  $scope.search = function() {
    $http.post('/api/images/search', { term: $scope.term }).success(function(data) {
      $scope.model = data;
    });
  };
}
