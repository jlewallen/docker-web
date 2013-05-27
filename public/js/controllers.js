'use strict';

function AppCtrl($scope, $http) {

}

function ImagesCtrl($scope, $http) {
  $scope.model = null;
  $http.get('/api/images').success(function(data) {
    $scope.model = _.map(data, function(image) {
      return _.extend(image, { });
    });
  });
}

function ContainersCtrl($scope, $http) {
  $scope.model = null;
  $http.get('/api/containers').success(function(data) {
    $scope.model = _.map(data, function(container) {
      return _.extend(container, { });
    });
  });
}

function ContainerCtrl($scope, $http, $routeParams) {
  $scope.model = null;
  $http.get('/api/containers/' + $routeParams.id).success(function(data) {
    $scope.model = data;
  });

  function call(url) {
    $http.post(url).success(function(data) {
      console.log("HI");
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
