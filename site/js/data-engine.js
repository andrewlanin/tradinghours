var module = angular.module("DataEngine", []);

module.factory("$data_engine", function() {
	return {
		magic: function() {
			return 4;
		}
	}
})
