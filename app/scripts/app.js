'use strict';

/**
 * @ngdoc overview
 * @name numberDuplicatesApp
 * @description
 * # numberDuplicatesApp
 *
 * Main module of the application.
 */
angular
  .module('numberDuplicatesApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
