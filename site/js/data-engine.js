var module = angular.module("DataEngine", []);

module.factory("$data_engine", function() {
	var SECONDS_IN_DAY = 86400;
	var SECONDS_IN_HOUR = 3600;
	var SECONDS_IN_MINUTE = 60;

	var assert = function(condition, message) {
		if (!condition) {
			message = message || "Assertion failed";
			throw new Error(message);
		}
	}

	var secondOfTheDay = function(time) {
		return time.hour() * SECONDS_IN_HOUR + time.minute() * SECONDS_IN_MINUTE + time.second();
	}

	var TradingDay = function(frames) {
		this.frames = frames;
	}

	TradingDay.prototype.frame = function(secondOfTheDay) {
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
			end: SECONDS_IN_DAY,
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
					return parseInt(parts[0]) * SECONDS_IN_HOUR + parseInt(parts[1]) * SECONDS_IN_MINUTE;
				} else if(parts.length == 3) {
					return parseInt(parts[0]) * SECONDS_IN_HOUR + parseInt(parts[1]) * SECONDS_IN_MINUTE + parseInt(parts[2]);
				} else {
					assert(false, "Invalid time string: " + str);
				}
			}

			return {
				start: timeStrToSecondOfTheDay(spec.start),
				end: timeStrToSecondOfTheDay(spec.end) || SECONDS_IN_DAY, // 00:00 here means end of the day
				type: spec.type
			};
		}

		_.each(sessionSpec, function(spec) {
			var specWeekdays = parseWeekDaySpec(spec.days);
			_.each(specWeekdays, function(weekday){
				weekdays[weekday].push(preprocessSpec(spec))
			});
		});

		var ensureSessionsNotOverlapping = function(frames) {
			var prevFrameEnd;
			_.each(frames, function(frame){
				if (prevFrameEnd) {
					assert(frame.start >= prevFrameEnd, "Sessions overlapping");
				}
				prevFrameEnd = frame.end;
			});
		}

		this.weekdays = _.map(weekdays, function(weekdaySpec){
			var sorted = _.sortBy(weekdaySpec, "start");
			ensureSessionsNotOverlapping(sorted);
			return sorted;
		});
	}

	TradingWeek.prototype.tradingDay = function(time) {
		return new TradingDay(this.weekdays[time.day()]);
	};

	TradingWeek.prototype.frame = function(time) {
		return this.tradingDay(time).frame(secondOfTheDay(time));
	};

	return {
		tradingWeek: function(sessionSpec) {
			return new TradingWeek(sessionSpec);
		},
		timeline: function(tradingWeek, now) {
			var days = [
				tradingWeek.tradingDay(now.clone().subtract(1, "days")),
				tradingWeek.tradingDay(now.clone()),
				tradingWeek.tradingDay(now.clone().add(1, "days"))
			];

			var scale = SECONDS_IN_DAY;
			var marginLeft = 25920;

			var startDay = 0;

			var secondOfCurrentDay = secondOfTheDay(now);
			if (secondOfCurrentDay >= marginLeft) {
				startDay = 1;
				days[startDay].startFrom = secondOfCurrentDay - marginLeft;
			} else {
				startDay = 0
				days[startDay].startFrom = SECONDS_IN_DAY - (marginLeft - secondOfTheDay);
			}

			var result = [];
			var prevFrame;
			for (var i = startDay; i < days.length; i++) {
				var day = days[i];
				var t = day.startFrom || 0;
				while (t < SECONDS_IN_DAY) {
					var frame = day.frame(t);
					var frameLength = (frame.end - t) / scale * 100;
					if (prevFrame && prevFrame.type == frame.type) {
						prevFrame.percent += frameLength;
					} else {
						var newFrame = {
							percent: frameLength,
							type: frame.type
						};
						result.push(newFrame);
						prevFrame = newFrame;
					}
					t = frame.end;
				}
			}

			return result;
		}
	}
});
