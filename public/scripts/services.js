'use strict';
var appServices = angular.module('App.services', []);


appServices.factory('mockFriends', function() {
  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruffer' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  };
});