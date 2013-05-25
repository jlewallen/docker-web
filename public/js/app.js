'use strict';


// Declare app level module which depends on filters, and services
angular.module('dockerApp', ['dockerApp.filters', 'dockerApp.services', 'dockerApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/images', {templateUrl: 'partials/images', controller: ImagesCtrl});
    $routeProvider.when('/containers', {templateUrl: 'partials/containers', controller: ContainersCtrl});
    $routeProvider.otherwise({redirectTo: '/containers'});
    $locationProvider.html5Mode(true);
  }]);
