var module = angular.module("TradingHours", []);

module.controller("ExchangeListController", ["$scope", "$interval", function($scope, $interval) {
	var render_current_time = function() {
		$scope.now = moment.utc().format("HH:mm");
		$scope.now_sec = moment.utc().format("ss");
	}

	render_current_time();
	$interval(render_current_time, 1000);
	
	$scope.exchanges = exchanges();
}])
