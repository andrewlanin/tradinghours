var module = angular.module("TradingHours", ["DataEngine"]);

module.controller("ExchangeListController", [
                  "$scope", "$interval", "$data_engine",
                  function($scope, $interval, $data_engine) {
	var render_current_time = function() {
		$scope.now = moment.utc().format("HH:mm");
		$scope.now_sec = moment.utc().format("ss");
	}

	render_current_time();
	$interval(render_current_time, 1000);
	
	$scope.exchanges = _.map(exchanges(), function(exchange){
		exchange._tradingWeek = $data_engine.tradingWeek(exchange.trading_hours);
		exchange._timeline = $data_engine.timeline(exchange._tradingWeek, moment.tz(exchange.timezone));
		return exchange;
	});
}])
