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
        templateUrl: 'views/productselection.html',
        controller: 'ProductselectionCtrl',
        controllerAs: 'productSelection',
        resolve: {
            init: interceptWith('ProductSelectionInit')
        }
      })
      .when('/confirmationPage', {
        templateUrl: 'views/confirmationpage.html',
        controller: 'ConfirmationpageCtrl',
        controllerAs: 'confirmationPage'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  
