var module = angular.module("TradingHours", ["DataEngine"]);

module.controller("ExchangeListController", [
                  "$scope", "$interval", "$data_engine",
                  function($scope, $interval, $engine) {
    var getBoolSetting = function(name, defaultValue) {
		var val = localStorage.getItem(name);
		if (val == null) {
			return defaultValue;
		}
		return val == "true";
    }

	//
	// Current time
	//

	var renderCurrentTime = function() {
		$scope.now = $scope.utcClocks ? moment.utc() : moment();
		$scope.now_hm = $scope.now.format("HH:mm");
		$scope.now_s = $scope.now.format("ss");
	}

	renderCurrentTime();
	$interval(renderCurrentTime, 1000);

	//
	// UTC / local switch
	//

	$scope.utcClocks = getBoolSetting("utcClocks", true); // otherwise user-local

	$scope.switchUtcClocks = function() {
		$scope.utcClocks = !$scope.utcClocks;
		renderCurrentTime();
		localStorage.setItem("utcClocks", String($scope.utcClocks));
	};

	//
	// Exchanges
	//	

	var exchangesObjects = exchanges().map(function(spec) {
		return $engine.exchange(spec);
	})

	$scope.exchanges = _.sortBy(exchangesObjects, function(exchange) {
		return exchange.spec.name
	});

	//
	// Trading state
	//

	var updateCurrentTradingStates = function() {
		_.each($scope.exchanges, function(exchange){
			exchange.updateTradingState($scope.now);
		});
	}

	updateCurrentTradingStates();
	$interval(updateCurrentTradingStates, 10000);

	//
	// Trading timelines
	//

	var calculateTimelines = function() {
		_.each($scope.exchanges, function(exchange){
			exchange.updateTimeline($scope.now, 86400, 25920);
		});
	}

	calculateTimelines();
	$interval(calculateTimelines, 60000);

	//
	// Exchange time
	//

	$scope.formatExchangeTime = function(exchange) {
		return exchange.localTime($scope.now).format("ddd, HH:mm");
	}
}])
