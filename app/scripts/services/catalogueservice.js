'use strict';

/**
 * @ngdoc service
 * @name deimosApp.CatalugueService
 * @description
 * # CatalugueService
 * Service in the deimosApp.
 */
angular.module('deimosApp')
  .service('CatalogueService', ['$q', '$http', 'ConfigService', function ($q, $http, ConfigService) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    function getCatalogueWithConfig(config, locationID) {
        var deferred = $q.defer();
        $http.get(config.catalogueUrl, {
          headers: {
            'locationID': locationID,
          }
        })
          .then(
          function (response) {
            console.log('Received Catalogue' + response.data);
            deferred.resolve(response.data);
          },
          function (err) {
            deferred.reject(err);
          }
          );

        return deferred.promise;
      }

    function getCatalogue(locationID) {
      return ConfigService.getConfig().then(function(config) {return getCatalogueWithConfig(config, locationID);});
    }

    return {
      getCatalogue: getCatalogue
    };

  }]);