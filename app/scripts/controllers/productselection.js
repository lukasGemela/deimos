'use strict';

/**
 * @ngdoc function
 * @name deimosApp.controller:ProductselectionCtrl
 * @description
 * # ProductselectionCtrl
 * Controller of the deimosApp
 */
angular.module('deimosApp')
  .controller('ProductselectionCtrl', ['$scope', 'init',
    function ProductselectionCtrl($scope, init) {
      $scope.sports= [];
      $scope.news = [];
      $scope.basket = [];

      init.sports.forEach(function add(channel) { $scope.sports.push({ name: channel, selected: false });   });
      init.news.forEach(function add(channel) { $scope.news.push({ name: channel, selected: false });   });

      var addItemToBasket = function (nv) {
        nv.map(function (channel) { return channel.name; }).forEach(function (element) {
          if ($scope.basket.indexOf(element) === -1) {
            $scope.basket.push(element);
          }
        }, this);
      };

      var removeItemFromBasket = function (nv) {
        nv.map(function (channel) { return channel.name; }).forEach(function (element) {
          var index = $scope.basket.indexOf(element);
          if (index > -1) {
            $scope.basket.splice(index, 1);
          }
        }, this);


      };

      $scope.$watch('news|filter:{selected:true}', addItemToBasket, true);
      $scope.$watch('sports|filter:{selected:true}', addItemToBasket, true);
      $scope.$watch('sports|filter:{selected:false}', removeItemFromBasket, true);
      $scope.$watch('news|filter:{selected:false}', removeItemFromBasket, true);
    }]).service('ProductSelectionInit', ['$cookies', 'CustomerLocationService', 'CatalogueService', function ($cookies, CustomerLocationService, CatalogueService) {
    var _prepare = function () {

      var promise =  CustomerLocationService.getLocationId($cookies.get('customerId'))
        .then(function (locationId) {
          console.log("locationId LOADED");
          return CatalogueService.getCatalogue(locationId);
        });
      

        return promise;
    };

    return {
      prepare: _prepare
    };

  }]);
