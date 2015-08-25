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

	var formatSession = function(tradingHoursSpec) {
		var sessionStrings = [];
		var sessionsByDays = _.groupBy(tradingHoursSpec, "days");
		_.forEach(sessionsByDays, function(specs, days) {
			var sessionString = days + ": ";
			var sessionsOrder = ["premarket", "regular", "postmarket"];
			var sortedSpecs = _.sortBy(specs, function(spec){
				var i = sessionsOrder.indexOf(spec.type);
				return i == -1 ? 1000 : i;
			});
			_.forEach(sortedSpecs, function(spec, i) {
				var typeMarkers = {
					"premarket": " (Pre)",
					"postmarket": " (Post)"
				}
				var marker = typeMarkers[spec.type] || "";
				sessionString += (i ? ", " : "" ) + spec.start + "-" + spec.end + marker;
			});
			sessionStrings.push(sessionString);
		});
		return sessionStrings.join(" ");
	}

	$scope.exchanges = _.map(exchanges(), function(exchange){
		exchange._tradingWeek = $engine.tradingWeek(exchange.trading_hours);
		exchange._sessionString = formatSession(exchange.trading_hours);
		return exchange;
	});

	var updateCurrentTradingStates = function() {
		_.each($scope.exchanges, function(exchange){
			exchange._currentState = exchange._tradingWeek.frame($scope.now.clone().tz(exchange.timezone)).type;
		});
	}

	updateCurrentTradingStates();
	$interval(updateCurrentTradingStates, 60000);

	var calculateTimelines = function() {
		_.each($scope.exchanges, function(exchange){
			exchange._timeline = $engine.timeline(exchange._tradingWeek, $scope.now.clone().tz(exchange.timezone), 86400, 25920);
		});
	}

	calculateTimelines();
	$interval(calculateTimelines, 60000);
}])
