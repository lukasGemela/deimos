'use strict';

describe('Controller: ProductselectionCtrl', function () {

  // load the controller's module
  beforeEach(module('deimosApp'));

  var storedObj = {};
  var basketService = {
    set: function set(obj) {
      storedObj = obj;
    },
    get: function get() {
      return storedObj;
    }
  };

  var windowMock = {
  };

  var testCatalogue = {
    'news': [
      'Sky News',
      'Sky Sport News'
    ],
    'sports': [
      'Liverpool TV'
    ],
    'customerID': 'customerId'
  };

  var ProductselectionCtrl,
    scope, rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    storedObj = {};
    windowMock = {};

    ProductselectionCtrl = $controller('ProductselectionCtrl', {
      $scope: scope,
      init: testCatalogue,
      BasketService: basketService,
      $window: windowMock
      // place here mocked dependencies
    });
  }));

  it('happy path - attach catalogue and customerId to the scope', function () {

    scope.$apply(); //TO kick-off promises
    expect(scope.sports).toEqual([{ 'name': 'Liverpool TV', 'selected': false }]);
    expect(scope.news).toEqual([{ 'name': 'Sky News', 'selected': false }, { 'name': 'Sky Sport News', 'selected': false }]);
    expect(scope.customerID).toEqual('customerId');
  });

  it('sad path - no init data, it should keep catalogue empty', function () {

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      rootScope = $rootScope;
      storedObj = {};
      windowMock = {};

      ProductselectionCtrl = $controller('ProductselectionCtrl', {
        $scope: scope,
        init: undefined,
        BasketService: basketService,
        $window: windowMock
        // place here mocked dependencies
      });
    })

    expect(scope.sports).toEqual([]);
    expect(scope.news).toEqual([]);
    expect(scope.customerID).toEqual('unknown');
  });

  it('add sport channel to basket when selected', function () {
    scope.sports.forEach(function (part, index) {
      var obj = scope.sports[index];
      obj.selected = true;
      scope.sports[index] = obj;
    });
    scope.$digest();
    expect(scope.basket).toEqual(['Liverpool TV']);
  });

  it('add news channel to basket when selected', function () {
    scope.news.forEach(function (part, index) {
      var obj = scope.news[index];
      obj.selected = true;
      scope.news[index] = obj;
    });
    scope.$digest();
    expect(scope.basket).toEqual(['Sky News', 'Sky Sport News']);
  });

  it('remove sport channel from basket when unselected', function () {
    scope.sports.forEach(function (part, index) {
      var obj = scope.sports[index];
      obj.selected = true;
      scope.sports[index] = obj;
    });

    scope.$digest();

    scope.sports.forEach(function (part, index) {
      var obj = scope.sports[index];
      obj.selected = false;
      scope.sports[index] = obj;
    });

    scope.$digest();

    expect(scope.basket).toEqual([]);
  });

  it('remove news channel from basket when unselected', function () {
    scope.news.forEach(function (part, index) {
      var obj = scope.news[index];
      obj.selected = true;
      scope.news[index] = obj;
    });

    scope.$digest();

    scope.news.forEach(function (part, index) {
      var obj = scope.news[index];
      obj.selected = false;
      scope.news[index] = obj;
    });

    scope.$digest();

    expect(scope.basket).toEqual([]);


  });

  it('should on checkoutClicked store basket and customerId to BasketService and redirect to confirmationPage', function () {
    scope.basket = { basket: 'basket' };
    scope.checkoutClicked();

    expect(basketService.get()).toEqual({ customerID: 'customerId', basket: Object({ basket: 'basket' }) });
    expect(windowMock.location).toEqual('#!/confirmationPage');
  });

});
