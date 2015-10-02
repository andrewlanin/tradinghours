function exchanges() {
	return [	
		{
			"name": "NYSE",
			"timezone": "America/New_York",
			"link": "https://www.nyse.com/markets/hours-calendars",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "09:30",
					"end": "16:00"
				}
			]
		},
		{
			"name": "NYSE MKT (aka AMEX)",
			"timezone": "America/New_York",
			"link": "https://www.nyse.com/markets/hours-calendars",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "09:30",
					"end": "16:00"
				}
			]
		},
		{
			"name": "NASDAQ",
			"timezone": "America/New_York",
			"link": "http://www.nasdaq.com/about/trading-schedule.aspx",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "premarket",
					"start": "04:00",
					"end": "09:30"
				},
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "09:30",
					"end": "16:00"
				},
				{
					"days": "Mon-Fri",
					"type": "postmarket",
					"start": "16:00",
					"end": "20:00"
				}
			]
		},
		{
			"name": "BATS",
			"timezone": "America/New_York",
			"link": "https://www.batstrading.com/support/hours/",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "premarket",
					"start": "08:00",
					"end": "09:30"
				},
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "09:30",
					"end": "16:00"
				},
				{
					"days": "Mon-Fri",
					"type": "postmarket",
					"start": "16:00",
					"end": "20:00"
				}
			]
		},
		{
			"name": "OTC",
			"timezone": "America/New_York",
			"link": "http://www.otcmarkets.com/market-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "06:00",
					"end": "17:00"
				}
			]
		},
		{
			"name": "MOEX Securities",
			"timezone": "Europe/Moscow",
			"link": "http://moex.com/s371",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "09:30",
					"end": "19:00"
				}
			]
		},
		{
			"name": "MOEX Derivatives, FX & Commodities",
			"timezone": "Europe/Moscow",
			"link": "http://moex.com/s371",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "10:00",
					"end": "23:50"
				}
			]
		},
		{
			"name": "FXCM",
			"timezone": "America/New_York",
			"link": "http://www.dailyfx.com/forex_forum/order-execution-forex-trading-hours/201213-weekend-trading-execution-faq.html#post576907",
			"trading_hours": [
				{
					"days": "Sun",
					"type": "regular",
					"start": "17:00",
					"end": "00:00"
				},
				{
					"days": "Mon-Thu",
					"type": "regular",
					"start": "00:00",
					"end": "00:00"
				},
				{
					"days": "Fri",
					"type": "regular",
					"start": "00:00",
					"end": "17:00"
				}
			]
		},
	]
}
