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
		{
			"name": "Chi-X Europe",
			"timezone": "Europe/London",
			"link": "http://batstrading.co.uk/support/hours/",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "premarket",
					"start": "07:50",
					"end": "08:00"
				},
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "08:00",
					"end": "16:30"
				},
				{
					"days": "Mon-Fri",
					"type": "postmarket",
					"start": "16:35",
					"end": "17:30"
				}
			]
		},
		{
			"name": "Chi-X Japan",
			"timezone": "Asia/Tokyo",
			"link": "http://www.chi-x.jp/TRADINGONCHI-X/TRADINGSCHEDULE.aspx",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "09:00",
					"end": "11:30"
				},
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "12:30",
					"end": "15:00"
				}
			]
		},
		{
			"name": "BM&F Bovespa Equities, Stock options, Odd lots, ETFs",
			"timezone": "America/Sao_Paulo",
			"link": "http://www.bmfbovespa.com.br/en_us/services/trading/bm-fbovespapuma-trading-system/for-members-and-traders/trading-hours/equities/",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "10:00",
					"end": "16:55"
				},
				{
					"days": "Mon-Fri",
					"type": "postmarket",
					"start": "17:30",
					"end": "18:00"
				}
			]
		},
		{
			"name": "BM&F Bovespa Derivatives, Index, Futures, FX",
			"timezone": "America/Sao_Paulo",
			"link": "http://www.bmfbovespa.com.br/en_us/services/trading/bm-fbovespapuma-trading-system/for-members-and-traders/trading-hours/derivatives/",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "09:00",
					"end": "17:45"
				}
			]
		},
		{
			"name": "London Stock Exchange (LSE)",
			"timezone": "Europe/London",
			"link": "https://www.stockmarketclock.com/exchanges/lse/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "8:00",
					"end": "16:30"
				}
			]
		},
		{
			"name": "Tokyo Stock Exchange (TSE)",
			"timezone": "Asia/Tokyo",
			"link": "https://www.stockmarketclock.com/exchanges/jpx/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "9:00",
					"end": "11:30"
				},
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "12:30",
					"end": "15:00"
				}
			]
		},
		{
			"name": "Toronto Stock Exchange (TSX)",
			"timezone": "America/Toronto",
			"link": "https://www.stockmarketclock.com/exchanges/tsx/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "9:30",
					"end": "16:00"
				}
			]
		},
		{
			"name": "Australia Stock Exchange (ASX)",
			"timezone": "Australia/Sydney",
			"link": "https://www.stockmarketclock.com/exchanges/asx/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "10:00",
					"end": "16:00"
				}
			]
		},
		{
			"name": "Spanish Stock Exchange (BME)",
			"timezone": "Europe/Madrid",
			"link": "https://www.stockmarketclock.com/exchanges/bme/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "9:00",
					"end": "17:30"
				}
			]
		},
		{
			"name": "India National Stock Exchange (NSE)",
			"timezone": "Asia/Calcutta",
			"link": "https://www.stockmarketclock.com/exchanges/nse-india/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "9:15",
					"end": "15:30"
				}
			]
		},
		{
			"name": "Istanbul Stock Exchange (BIST)",
			"timezone": "Europe/Istanbul",
			"link": "https://www.stockmarketclock.com/exchanges/bist/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "9:30",
					"end": "12:30"
				},
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "14:00",
					"end": "17:30"
				}
			]
		},
		{
			"name": "Swiss Stock Exchange (SIX)",
			"timezone": "Europe/Zurich",
			"link": "https://www.stockmarketclock.com/exchanges/six/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "9:00",
					"end": "17:30"
				}
			]
		},
		{
			"name": "German Stock Exchange (FSX)",
			"timezone": "Europe/Berlin",
			"link": "https://www.stockmarketclock.com/exchanges/fsx/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "8:00",
					"end": "20:00"
				}
			]
		},
		{
			"name": "Milan Stock Exchange (MTA)",
			"timezone": "Europe/Rome",
			"link": "https://www.stockmarketclock.com/exchanges/mta/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "9:00",
					"end": "17:30"
				}
			]
		},
		{
			"name": "Hong Kong Stock Exchange (HKEX)",
			"timezone": "Asia/Hong_Kong",
			"link": "https://www.stockmarketclock.com/exchanges/hkex/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "9:30",
					"end": "12:00"
				},
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "13:00",
					"end": "16:00"
				}
			]
		},
		{
			"name": "Singapore Exchange (SGX)",
			"timezone": "Asia/Singapore",
			"link": "https://www.stockmarketclock.com/exchanges/sgx/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "9:00",
					"end": "17:00"
				}
			]
		},
		{
			"name": "Euronext Paris Stock Exchange",
			"timezone": "Europe/Paris",
			"link": "https://www.stockmarketclock.com/exchanges/euronext-paris/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "9:00",
					"end": "17:30"
				}
			]
		},
		{
			"name": "Xetra",
			"timezone": "Europe/Berlin",
			"link": "http://www.xetra.com/xetra-en/trading/trading-calendar-and-trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "9:00",
					"end": "17:30"
				}
			]
		},
		{
			"name": "Argentinian Stock Exchange (BCBA)",
			"timezone": "America/Argentina/Buenos_Aires",
			"link": "https://www.stockmarketclock.com/exchanges/bcba/trading-hours",
			"trading_hours": [
				{
					"days": "Mon-Fri",
					"type": "regular",
					"start": "11:00",
					"end": "17:00"
				}
			]
		}
	]
}
