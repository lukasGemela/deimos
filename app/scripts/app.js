'use strict';

/**
 * @ngdoc overview
 * @name deimosApp
 * @description
 * # deimosApp
 *
 * Main module of the application.
 */

var interceptWith = function(initMethod) {
        return [initMethod, function(m) {
          console.log(m.prepare());
                    return m.prepare();
                }];
};

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
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/productSelection', {
        templateUrl: 'views/productselection.html',
        controller: 'ProductselectionCtrl',
        controllerAs: 'productSelection',
        resolve: {
            init: interceptWith('ProductSelectionInit')
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  
