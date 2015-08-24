describe("Trading Hours data engine", function (argument) {
	var engine;

	beforeEach(angular.mock.module("DataEngine"));

	beforeEach(inject(function (_$data_engine_) {
		engine = _$data_engine_;
	}));

	it("can handle simplest session spec", function() {
		var spec = [
			{
				"days": "Mon-Wed,Fri",
				"start": "08:00",
				"end": "16:00",
				"type": "regular"
			}
		];
		var expected = [
			{
				"start": 28800,
				"end": 57600,
				"type": "regular"
			}
		];
		var week = engine.tradingWeek(spec);
		expect(week.weekdays).toEqual([[], expected, expected, expected, [], expected, []]);
	});

	it("can handle sessions with multiple frames", function() {
		var spec = [
			{
				"days": "Mon-Wed,Fri",
				"start": "08:00",
				"end": "16:00",
				"type": "regular"
			},
			{
				"days": "Mon-Wed,Fri",
				"start": "07:00",
				"end": "08:00",
				"type": "premarket"
			}
		];
		var expected = [
			{
				"start": 25200,
				"end": 28800,
				"type": "premarket"
			},
			{
				"start": 28800,
				"end": 57600,
				"type": "regular"
			}
		];
		var week = engine.tradingWeek(spec);
		expect(week.weekdays).toEqual([[], expected, expected, expected, [], expected, []]);
	});

	it("can handle different sessions for different weekdays", function() {
		var spec = [
			{
				"days": "Mon-Fri",
				"start": "08:00",
				"end": "16:00",
				"type": "regular"
			},
			{
				"days": "Mon-Wed",
				"start": "07:00",
				"end": "08:00",
				"type": "premarket"
			},
			{
				"days": "Sat-Tue",
				"start": "18:00",
				"end": "20:00",
				"type": "evening"
			}
		];
		var compiledRegular = {
			"start": 28800,
			"end": 57600,
			"type": "regular"	
		};
		var compiledPremarket = {
			"start": 25200,
			"end": 28800,
			"type": "premarket"
		};
		var compiledEvening = {
			"start": 64800,
			"end": 72000,
			"type": "evening"
		}
		var week = engine.tradingWeek(spec);
		expect(week.weekdays).toEqual([
			[compiledEvening],
			[compiledPremarket,compiledRegular,compiledEvening],
			[compiledPremarket,compiledRegular,compiledEvening],
			[compiledPremarket,compiledRegular],
			[compiledRegular],
			[compiledRegular],
			[compiledEvening]	
		]);
	});

	it("can't handle invalid weekday name", function() {
		var spec = [
			{
				"days": "Mon,QWE",
				"start": "08:00",
				"end": "16:00",
				"type": "regular"
			}
		];
		expect(function(){engine.tradingWeek(spec)}).
			toThrow(new Error("Incorrect weekday: QWE"));
	});

	it("can't handle overlapping sessions", function() {
		var spec = [
			{
				"days": "Mon",
				"start": "08:00",
				"end": "16:00",
				"type": "regular"
			},
			{
				"days": "Mon",
				"start": "07:00",
				"end": "08:05",
				"type": "premarket"
			}
		];
		expect(function(){engine.tradingWeek(spec)}).
			toThrow(new Error("Sessions overlapping"));
	});

	it("can select correct session by week day", function() {
		var spec = [
			{"days": "Sun","type": "Sun","start":"00:00","end":"01:00"},
			{"days": "Mon","type": "Mon","start":"00:00","end":"01:00"},
			{"days": "Tue","type": "Tue","start":"00:00","end":"01:00"},
			{"days": "Wed","type": "Wed","start":"00:00","end":"01:00"},
			{"days": "Thu","type": "Thu","start":"00:00","end":"01:00"},
			{"days": "Fri","type": "Fri","start":"00:00","end":"01:00"},
			{"days": "Sat","Sat": "Mon","start":"00:00","end":"01:00"}
		];
		var week = engine.tradingWeek(spec);
		expect(week.tradingDay(moment("2015-08-10")).frames[0].type).toEqual("Mon");
	});

	it("can select correct frame by second of the day", function() {
		var spec = [
			{
				"days": "Mon",
				"start": "08:00",
				"end": "16:00",
				"type": "regular"
			},
			{
				"days": "Mon",
				"start": "07:00",
				"end": "08:00",
				"type": "premarket"
			}
		];
		var week = engine.tradingWeek(spec);
		expect(week.tradingDay(moment("2015-08-10")).frame(43200).type).toEqual("regular");
	});

	it("can select correct frame by time", function() {
		var spec = [
			{
				"days": "Mon",
				"start": "08:00",
				"end": "16:00",
				"type": "regular"
			},
			{
				"days": "Mon",
				"start": "07:00",
				"end": "08:00",
				"type": "premarket"
			}
		];
		var week = engine.tradingWeek(spec);
		expect(week.frame(moment("2015-08-10T12:00:00")).type).toEqual("regular");
	});

	it("can handle full day session", function() {
		var spec = [
			{
				"days": "Mon",
				"start": "00:00",
				"end": "00:00",
				"type": "regular"
			}
		];
		var week = engine.tradingWeek(spec);
		expect(week.frame(moment("2015-08-10T12:00:00")).type).toEqual("regular");
	});

	it("can build simple timeline", function() {
		var spec = [
			{
				"days": "Mon-Sun",
				"start": "00:00",
				"end": "08:00",
				"type": "regular"
			}
		];
		var week = engine.tradingWeek(spec);
		var timeline = engine.timeline(week, moment("2015-01-01T00:00:00"), 86400, 3600);
		var timelineValues = _.map(timeline.frames, function(frame) {
			return [frame.type, frame.offset, frame.length];
		});
		expect(timelineValues).toEqual([["out", 0, 3600], ["regular", 3600, 28800], ["out", 32400, 54000]]);
	});
})
