# COVID-19 statistics API

Below you can find some useful information about COVID-19 statistics API. It was build using node.js, Express, Axios and Papa Parse library for .csv parsing. The data is fetched from https://github.com/CSSEGISandData/COVID-19, provided by John Hopkins University CSSE. The API is hosted on heroku. 

It is available at: https://coronavirusapi.herokuapp.com/ 

# endpoinds:
The API is defined by three endpoinds:

https://coronavirusapi.herokuapp.com/world

combined world data
{
	worldStats:
	{
		confirmed:
		deaths:
		recovered:
		countriesAffected:
		lastUpdate
	}
}

https://coronavirusapi.herokuapp.com/countries

countries data
{
	countries:
	[
		{
			id:
			country:
			confirmed:
			deaths:
			recovered:
			lastUpdate:
		},
	]
}

Query parameter filtering available using country parameter

example: https://coronavirusapi.herokuapp.com/countries?country=aus will return data for Austria and Australia

https://coronavirusapi.herokuapp.com/places

places data, including state/province
{
	countries:
	[
		{
			id:
			country:
			state:
			confirmed:
			deaths:
			recovered:
			lastUpdate:
		},
	]
}

Query parameter filtering available using country and state parameters.