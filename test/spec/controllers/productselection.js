'use strict';

describe('Controller: ProductselectionCtrl', function () {

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
    console.log('calledspy');
    spyOn(cookies, 'get').and.callThrough();
    spyOn(catalogueService, 'getCatalogue').and.callThrough();
    spyOn(customerLocationService, 'getLocationId').and.callThrough();
  });

  var ProductselectionCtrl,
    scope, $q, rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$q_, filterFilter) {
    console.log('calledController');
    scope = $rootScope.$new();
    rootScope = $rootScope
    $q = _$q_;

    ProductselectionCtrl = $controller('ProductselectionCtrl', {
      $scope: scope,
      $q: $q,
      init: testCatalogue,
      $cookies: cookies,
      CustomerLocationService: customerLocationService,
      CatalogueService: catalogueService
      // place here mocked dependencies
    });
  }));

  it('happy path - should load catalogue and attach it to the scope', function () {

    scope.$apply(); //TO kick-off promises

    expect(cookies.get).toHaveBeenCalled();
    expect(customerLocationService.getLocationId).toHaveBeenCalledWith('customerId');
    expect(catalogueService.getCatalogue).toHaveBeenCalledWith('LOCATION');
    expect(scope.sports).toEqual([{ 'name': 'Liverpool TV', 'selected': false }]);
    expect(scope.news).toEqual([{ 'name': 'Sky News', 'selected': false }, { 'name': 'Sky Sport News', 'selected': false }]);
  });

  it('add sport channel to basket when selected', function () {
      scope.$apply;
      scope.$digest;
      scope.$digest;

      console.log(scope.sports);

      console.log("12345");
            console.log("12345");
      console.log("12345");
      console.log("12345");
      console.log("12345");
      console.log("12345");
      console.log("12345");
      console.log("12345");

      scope.sports.push({ 'name': 'Liverpool TV Test', 'selected': true });
      console.log(scope.sports);
      scope.$apply;
      scope.$digest;

      expect(scope.basket).toEqual(['Liverpool TV Test']);
  });

  it('add news channel to basket when selected', function () {



  });

  it('remove sport channel from basket when unselected', function () {



  });

  it('remove news channel from basket when unselected', function () {



  });

});
