'use strict';

describe('Service: ProductSelectionInit', function () {

  // load the controller's module
  beforeEach(module('deimosApp'));

  var testCatalogue = {
    'news': [
      'Sky News',
      'Sky Sport News'
    ],
    'sports': [
      'Liverpool TV'
    ],
  };

  var catalogueService = {
    getCatalogue: function getCatalogue() {
      return $q.when(testCatalogue);
    }
  };

  var customerLocationService = {
    getLocationId: function getLocationId() {
      return $q.when('LOCATION');
    }
  };

  var cookies = {
    get: function get() {
      return 'customerId';
    }
  };

  beforeEach(function () {
    spyOn(cookies, 'get').and.callThrough();
    spyOn(catalogueService, 'getCatalogue').and.callThrough();
    spyOn(customerLocationService, 'getLocationId').and.callThrough();
  });

  var ProductSelectionInit;

  beforeEach(module(function ($provide) {
    $provide.value('$cookies', cookies);
    $provide.value('CustomerLocationService', customerLocationService);
    $provide.value('CatalogueService', catalogueService);
  }));

  var $rootScope, $q;
  beforeEach(inject(function (_$rootScope_, _ProductSelectionInit_, _$q_) {
    ProductSelectionInit = _ProductSelectionInit_;
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  it('happyPath - get catalogue', function () {
    console.log(ProductSelectionInit);
    ProductSelectionInit.prepare().then(function (result) {
       expect(result).toEqual({ news: [ 'Sky News', 'Sky Sport News' ], sports: [ 'Liverpool TV' ], customerID: 'customerId' });
      expect(cookies.get).toHaveBeenCalled();
      expect(customerLocationService.getLocationId).toHaveBeenCalledWith('customerId');
      expect(catalogueService.getCatalogue).toHaveBeenCalledWith('LOCATION');
    });

    $rootScope.$apply(); //TO kick-off promises
  });

});

