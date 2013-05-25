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
