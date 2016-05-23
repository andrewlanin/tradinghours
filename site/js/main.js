var module = angular.module("TradingHours", ["DataEngine"]);

module.controller("ExchangeListController", [
                  "$scope", "$interval", "$data_engine",
                  function($scope, $interval, $engine) {
	var renderCurrentTime = function() {
		$scope.now = moment.utc();
		$scope.now_hm = $scope.now.format("HH:mm");
		$scope.now_s = $scope.now.format("ss");
	}

	renderCurrentTime();
	$interval(renderCurrentTime, 1000);

	$scope.exchanges = _.sortBy(_.map(exchanges(), function(exchangeSpec){
		return $engine.exchange(exchangeSpec);
	}), function(e) {return e.spec.name});

	var updateCurrentTradingStates = function() {
		_.each($scope.exchanges, function(exchange){
			exchange.updateTradingState($scope.now);
		});
	}

	updateCurrentTradingStates();
	$interval(updateCurrentTradingStates, 60000);

	var calculateTimelines = function() {
		_.each($scope.exchanges, function(exchange){
			exchange.updateTimeline($scope.now, 86400, 25920);
		});
	}

	calculateTimelines();
	$interval(calculateTimelines, 60000);
}])
