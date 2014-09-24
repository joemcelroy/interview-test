describe("Example", function() {

  beforeEach(module("ReservationControllers"));

  beforeEach(inject(function($injector) {
    this.get = $injector.get
  }))
    
  it("injector should exist", function() {
    expect(this.get).toBeTruthy()
  });

});
