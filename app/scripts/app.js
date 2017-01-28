'use strict';

/**
 * @ngdoc overview
 * @name deimosApp
 * @description
 * # deimosApp
 *
 * Main module of the application.
 */
angular
  .module('deimosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/main.html',
      //   controller: 'MainCtrl',
      //   controllerAs: 'main'
      // })
      // .when('/about', {
      //   templateUrl: 'views/about.html',
      //   controller: 'AboutCtrl',
      //   controllerAs: 'about'
      // })
      .when('/productSelection', {
        templateUrl: 'views/productselection.html',
        controller: 'ProductselectionCtrl',
        controllerAs: 'productSelection'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
