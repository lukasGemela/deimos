'use strict';

/**
 * @ngdoc function
 * @name deimosApp.controller:ConfirmationpageCtrl
 * @description
 * # ConfirmationpageCtrl
 * Controller of the deimosApp
 */
angular.module('deimosApp')
  .controller('ConfirmationpageCtrl', ['BasketService',  function (BasketService) {
    this.basket = BasketService.get();
  }]);
