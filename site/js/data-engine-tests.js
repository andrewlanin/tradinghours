describe("Trading Hours data engine", function (argument) {
	var engine;

	beforeEach(angular.mock.module("DataEngine"));

	beforeEach(inject(function (_$data_engine_) {
		engine = _$data_engine_;
	}));

	it("displays correct magic", function() {
		expect(engine.magic()).toBe(4);
	})
})
