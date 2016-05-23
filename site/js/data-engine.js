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

	var Exchange = function(spec) {
		this.spec = spec;
		this.tradingWeek = new TradingWeek(spec.trading_hours);
		this.sessionString = this.formatSession();
	}

	Exchange.prototype.localTime = function(utc) {
		return utc.clone().tz(this.spec.timezone);
	}

	Exchange.prototype.formatSession = function() {
		var sessionStrings = [];
		var sessionsByDays = _.groupBy(this.spec.trading_hours, "days");
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

	Exchange.prototype.updateTradingState = function(now) {
		this.tradingState = this.tradingWeek.frame(this.localTime(now)).type;
	}

	Exchange.prototype.updateTimeline = function(now, length, marginLeft) {
		this.timeline = calculateTimeline(this.tradingWeek, this.localTime(now), length, marginLeft);
	}

	var calculateTimeline = function(tradingWeek, now, length, marginLeft) {
		var time = now.subtract(marginLeft, "seconds");
		var secondsToNextHour = SECONDS_IN_HOUR - time.minute() * SECONDS_IN_MINUTE - time.second(); 
		var totalLength = 0;
		var frames = [];
		var prevFrame;
		while (totalLength < length) {
			var tradingDay = tradingWeek.tradingDay(time);
			var second = secondOfTheDay(time);
			while (second < SECONDS_IN_DAY) {
				var frame = tradingDay.frame(second);
				var frameLength = Math.min(frame.end - second, length - totalLength);
				if (prevFrame && prevFrame.type == frame.type) {
					// merge neighbour frames with same type
					prevFrame.length += frameLength;
					prevFrame.lengthPercent = prevFrame.length / length * 100;
				} else {
					var newFrame = {
						offset: totalLength,
						offsetPercent: totalLength / length * 100,
						length: frameLength,
						lengthPercent: frameLength / length * 100,
						type: frame.type
					};
					frames.push(newFrame);
					prevFrame = newFrame;
				}
				second = frame.end;
				totalLength += frameLength;
			}
			time = time.startOf("day").add(1, "days");
		}
		var hoursBreaks = [];
		var offset = secondsToNextHour;
		while (offset < length) {
			hoursBreaks.push({
				offset: offset,
				offsetPercent: offset / length * 100
			});
			offset += SECONDS_IN_HOUR;
		}
		return {
			frames: frames,
			hoursBreaks: hoursBreaks
		};
	}

	return {
		tradingWeek: function(sessionSpec) {
			return new TradingWeek(sessionSpec);
		},
		exchange: function(spec) {
			return new Exchange(spec);
		},
		timeline: calculateTimeline
	}
});
