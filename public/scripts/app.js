'use strict';

var app = angular.module('App', ['App.controllers', 'App.filters', 'App.services', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('home', {url: '/home', templateUrl: 'views/home.html', controller: 'HomeCtrl'})
    .state('notHome1', {url: '/notHome1', templateUrl: 'views/notHome1.html', controller: 'NotHomeCtrl1'})
    .state('notHome2', {url: '/notHome2', templateUrl: 'views/notHome2.html', controller: 'NotHomeCtrl2'});

  $urlRouterProvider.otherwise('/home');

});

