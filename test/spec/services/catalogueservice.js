'use strict';

describe('Service: CatalugueService', function () {

  // load the service's module
  beforeEach(module('deimosApp'));

  // instantiate service
  var CatalogueService;

  var isError = false;

  //Mocks
  var httpMock;
  var mockConfigService;
  var testURL = "http://tests1/catalogue";

  var testCatalogue = {
    'news': [
      'Sky News',
      'Sky Sport News'
    ],
    'sports': [
      'Liverpool TV'
    ],
  };
  
  beforeEach(function () {

    mockConfigService = {
      getConfig: function () {
        return $q.when({
          "catalogueUrl": testURL
        });
      }
    };

    httpMock = {
      get: function () {
        return {
          then: function (onSuccess, onError) {
            if (!isError) {
              onSuccess({
                data: testCatalogue
              });
            } else {
              onError("Failed");
            }
          }
        };
      }
    };

    spyOn(mockConfigService, 'getConfig').and.callThrough();

    module(function ($provide) {
      $provide.value("$http", httpMock);
      $provide.value("ConfigService", mockConfigService);
    });

    inject(function (_CatalogueService_) {
      CatalogueService = _CatalogueService_;
    });
  });

  var $rootScope, $q;
  beforeEach(inject(function (_$rootScope_, _$q_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  it('Should instantiate', function () {
    expect(!!CatalogueService).toBe(true);
  });

  it('Should call http and return catalogue ', function (done) {
    CatalogueService.getCatalogue("12345").then(function (data) {
      expect(data).toEqual(testCatalogue);
      expect(mockConfigService.getConfig).toHaveBeenCalled();
      done();
    }, function (err) {
      done(err);
    });
    $rootScope.$apply(); //TO kick-off promise
  });

  it('Should handle error from http', function (done) {
    CatalogueService.getCatalogue('12345').then(function () {
      done("FAILED");
    }, function (err) {
      expect(err).toEqual("Failed");
      expect(mockConfigService.getConfig).toHaveBeenCalled();
      done();
    });
    $rootScope.$apply(); //TO kick-off promise
  });

});
