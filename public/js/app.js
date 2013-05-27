'use strict';

angular.module('dockerApp', ['dockerApp.filters', 'dockerApp.services', 'dockerApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/images', { templateUrl: 'partials/images', controller: ImagesCtrl });
    $routeProvider.when('/images/:id', { templateUrl: 'partials/image', controller: ImageCtrl });
    $routeProvider.when('/containers', { templateUrl: 'partials/containers', controller: ContainersCtrl });
    $routeProvider.when('/containers/:id', { templateUrl: 'partials/container', controller: ContainerCtrl });
    $routeProvider.when('/about', { templateUrl: 'partials/about', controller: AboutCtrl });
    $routeProvider.otherwise({redirectTo: '/containers'});
    $locationProvider.html5Mode(true);
  }]);
