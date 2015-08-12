var module = angular.module("DataEngine", []);

var assert = function(condition, message) {
	if (!condition) {
		message = message || "Assertion failed";
		throw new Error(message);
	}
}

var TradingDay = function(frames) {
	this.frames = frames;
}

TradingDay.prototype.frameForTime = function(time) {
	var secondOfTheDay = time.hour() * 3600 + time.minute() * 60 + time.second();
	for (var i=0; i<this.frames.length; i++) {
		var frame = this.frames[i];
		if (secondOfTheDay < frame.start) {
			return {
				start: secondOfTheDay,
				end: frame.start,
				type: "out"
			}
		} else if (secondOfTheDay >= frame.start && secondOfTheDay < frame.end) {
			return frame;
		}
	}

	return {
		start: secondOfTheDay,
		end: 86400,
		type: "out"
	}
}

var TradingWeek = function(sessionSpec) {
	var weekdays = [[], [], [], [], [], [], []];

	var parseWeekDaySpec = function(str) {
		var weekdaysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var result = [];
		var parts = str.split(",");
		_.each(parts, function(part) {
			var isRange = (part.indexOf("-") > -1);
			if (isRange) {
				var rangeParts = part.split("-");
				assert(rangeParts.length == 2, "Incorrect weekday range: " + part);
				var rangeBegin = weekdaysNames.indexOf(rangeParts[0]);
				assert(rangeBegin != -1, "Incorrect weekday: " + rangeParts[0]);
				var rangeEnd = weekdaysNames.indexOf(rangeParts[1]);
				assert(rangeEnd != -1, "Incorrect weekday: " + rangeParts[1]);
				var i = rangeBegin;
				while (i != rangeEnd) {
					result.push(i);
					if (++i >= weekdaysNames.length) {
						i = 0;
					}
				}
				result.push(rangeEnd);
			} else {
				var weekday = weekdaysNames.indexOf(part);
				assert(weekday != -1, "Incorrect weekday: " + part);
				result.push(weekday);
			}
		});
		return _.uniq(result);
	}

	var preprocessSpec = function(spec) {
		var result = {};

		var timeStrToSecondOfTheDay = function(str) {
			var parts = str.split(":");
			if (parts.length == 2) {
				return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60;
			} else if(parts.length == 3) {
				return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
			} else {
				assert(false, "Invalid time string: " + str);
			}
		}

		return {
			start: timeStrToSecondOfTheDay(spec.start),
			end: timeStrToSecondOfTheDay(spec.end),
			type: spec.type
		};
	}

	_.each(sessionSpec, function(spec) {
		var specWeekdays = parseWeekDaySpec(spec.days);
		_.each(specWeekdays, function(weekday){
			weekdays[weekday].push(preprocessSpec(spec))
		});
	});

	_.each(weekdays, function(weekdaySpec){
		_.sortBy()
	})

	this.weekdays = _.map(weekdays, function(weekdaySpec){
		return _.sortBy(weekdaySpec, "start");
	});
}

TradingWeek.prototype.tradingDay = function(time) {
	return new TradingDay(this.weekdays[time.day()]);
};

module.factory("$data_engine", function() {
	return {
		tradingWeek: function(sessionSpec) {
			return new TradingWeek(sessionSpec);
		},
		renderTimeline: function(tradingWeek, now) {
		}
	}
})