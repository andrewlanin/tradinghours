function exchanges() {
	return [	
		{
			"name": "New York Stock Exchange",
			"timezone": "America/New_York",
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
			"name": "NASDAQ",
			"timezone": "America/New_York",
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
					"end": "17:00"
				}
			]
		},
		{
			"name": "Moscow Exchange (MOEX)",
			"timezone": "Europe/Moscow",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "premarket",
					"start": "09:45",
					"end": "10:00"
				},
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "10:00",
					"end": "18:45"
				},
				{
					"days": "Mon-Fri",
					"type": "postmarket",
					"start": "18:45",
					"end": "18:50"
				}
			]
		}
	]
}
