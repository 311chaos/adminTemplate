'use strict';
var appFilters = angular.module('App.filters', []);


appFilters.filter('dateStr', function() {
  return function(input) {
    return Date.parse(input);
  };
});
