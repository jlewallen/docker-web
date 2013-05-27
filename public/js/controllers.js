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

function ContainerCtrl($scope, $http, $routeParams) {
  $scope.model = null;
  $http.get('/api/containers/' + $routeParams.id).success(function(data) {
    $scope.model = data;
  });
  function call(url) {
    $scope.busy = true;
    $http.post(url).success(function(data) {
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
    call('/api/containers/' + $routeParams.id + '/remove');
  };
}

function ImageCtrl($scope, $http, $routeParams) {
  $scope.model = null;
  $http.get('/api/images/' + $routeParams.id).success(function(data) {
    $scope.model = data;
  });
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
