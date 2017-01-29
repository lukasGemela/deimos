'use strict';

/**
 * @ngdoc function
 * @name deimosApp.controller:ProductselectionCtrl
 * @description
 * # ProductselectionCtrl
 * Controller of the deimosApp
 */
angular.module('deimosApp')
  .controller('ProductselectionCtrl', ['$scope', 'init', 'BasketService', '$window',
    function ProductselectionCtrl($scope, init, BasketService, $window) {
      if(init) {
      $scope.sports= init.sports.map(function(sportChannel) {return { name: sportChannel, selected: false };});
      $scope.news = init.news.map(function(newsChannel) {return { name: newsChannel, selected: false };});
      $scope.customerID = init.customerID;
      $scope.basket = [];
      } else {
        $scope.sports = [];
        $scope.news = [];
        $scope.customerID = 'unknown';
      }

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

    $scope.checkoutClicked = function(){
      BasketService.set({'customerID' : $scope.customerID, 'basket' : $scope.basket});
      $window.location = '#!/confirmationPage';
    };

    }]).service('ProductSelectionInit', ['$cookies', 'CustomerLocationService', 'CatalogueService', function ($cookies, CustomerLocationService, CatalogueService) {
    var _prepare = function () {
      var consumerID = $cookies.get('customerId');
      var promise =  CustomerLocationService.getLocationId(consumerID)
        .then(function (locationId) {
          return CatalogueService.getCatalogue(locationId);
        }).then(function(catalogue) {
          catalogue.customerID = consumerID;
          return catalogue;
      }).catch(function(err) {
        console.log('Init Error: ' + err);
      }
      );
      
      return promise;
    };

    return {
      prepare: _prepare
    };

  }]);
