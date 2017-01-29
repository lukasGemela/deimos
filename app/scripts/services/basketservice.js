'use strict';

/**
 * @ngdoc service
 * @name deimosApp.BasketService
 * @description
 * # BasketService
 * Factory in the deimosApp.
 */
angular.module('deimosApp')
  .factory('BasketService', function () {
    var savedData = {};
    function set(data) {
      savedData = data;
    }
    function get() {
      return savedData;
    }

    return {
      set: set,
      get: get
    };
  });
