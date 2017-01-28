'use strict';

describe('Controller: ProductselectionCtrl', function () {

  // load the controller's module
  beforeEach(module('deimosApp'));

  var ProductselectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductselectionCtrl = $controller('ProductselectionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductselectionCtrl.awesomeThings.length).toBe(3);
  });
});
