function exchanges() {
	return [	
		{
			"short_name": "NYSE",
			"full_name": "New York Stock Exchange",
			"timezone": "America/New_York",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "08:30",
					"end": "16:30"
				}
			],
			"holidays": [
				{ref: "USA"}
			]
		}
	]
}

function holidays() {
	return {
		"USA": [
			"2015-01-01"
		]
	}
}
