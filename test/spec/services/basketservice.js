'use strict';

describe('Service: BasketService', function () {

  // load the service's module
  beforeEach(module('deimosApp'));

  // instantiate service
  var BasketService;
  beforeEach(inject(function (_BasketService_) {
    BasketService = _BasketService_;
  }));

  it('should initialise', function () {
    expect(!!BasketService).toBe(true);
  });

  it('should keep stored data', function () {
    BasketService.set({data : 'data'});
    expect(BasketService.get()).toEqual({data : 'data'});
  });
});
