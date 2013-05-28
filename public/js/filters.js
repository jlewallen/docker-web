'use strict';

angular.module('dockerApp.filters', []).
  filter('dockerId', function() {
    return function(text) {
      return (text || '').substring(0, 12);
    }
  }).
  filter('momentAgo', function() {
    return function(text) {
      return text == null ? '' : moment(text).fromNow();
    }
  }).
  filter('dateAndTime', function() {
    return function(text) {
      return text == null ? '' : moment(text).format('LLL');
    }
  }).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
