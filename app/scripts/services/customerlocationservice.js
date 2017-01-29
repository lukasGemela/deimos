'use strict';

/**
 * @ngdoc service
 * @name deimosApp.CustomerLocationService
 * @description
 * # CustomerLocationService
 * Service in the deimosApp.
 */
angular.module('deimosApp')
  .service('CustomerLocationService', ['$q', function ($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var locations = ['LONDON', 'LIVERPOOL'];

    this.getLocationId = function getLocationId(customerId) {
      var deferred = $q.defer();
      if(customerId === undefined) {
        deferred.reject('CustomerId is not defined');
      } else {
        deferred.resolve(locations[getRandomInt(0, 1)]);
      }

      return deferred.promise;
    };

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  }]);
