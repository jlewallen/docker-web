'use strict';

function AppCtrl($scope, $http) {

}

function ImagesCtrl($scope, $http) {
  $scope.model = null;
  $http.get('/api/images').success(function(data) {
    $scope.model = data;
  });
}


function ContainersCtrl($scope, $http) {
  $scope.model = null;
  $http.get('/api/containers').success(function(data) {
    $scope.model = data;
  });
}
