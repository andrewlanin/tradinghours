var module = angular.module("TradingHours", ["DataEngine"]);

module.controller("ExchangeListController", [
                  "$scope", "$interval", "$data_engine",
                  function($scope, $interval, $data_engine) {
	var render_current_time = function() {
		$scope.now = moment.utc();
		$scope.now_hm = $scope.now.format("HH:mm");
		$scope.now_s = $scope.now.format("ss");
	}

	render_current_time();
	$interval(render_current_time, 1000);
	
	$scope.exchanges = _.map(exchanges(), function(exchange){
		exchange._tradingWeek = $data_engine.tradingWeek(exchange.trading_hours);
		exchange._currentState = exchange._tradingWeek.frame($scope.now).type;
		exchange._timeline = $data_engine.timeline(exchange._tradingWeek, $scope.now.tz(exchange.timezone));
		return exchange;
	});
}])
