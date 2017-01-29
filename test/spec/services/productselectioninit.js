'use strict';

describe('Service: ProductSelectionInit', function () {

  // load the service's module
  beforeEach(module('deimosApp'));

  // instantiate service
  var ProductSelectionInit;
  beforeEach(inject(function (_ProductSelectionInit_) {
    ProductSelectionInit = _ProductSelectionInit_;
  }));

  it('should do something', function () {
    expect(!!ProductSelectionInit).toBe(true);
  });

});
