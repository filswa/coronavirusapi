# COVID-19 statistics API

It was build using **node.js**, **Express**, **Axios** and **Papa Parse** library for .csv parsing.

The data is fetched from https://github.com/CSSEGISandData/COVID-19, provided by John Hopkins University CSSE.

It is currently in Legacy Mode, showing latest data from December 1st 2023, since JHU stopped publishing statistic updates.

~~It is available at: https://coronavirusapi.herokuapp.com/~~

It can be built and ran locally by:
- installing reqiuired packages
  
  `npm install`
- starting the server
  
  `npm run start`


# endpoinds:
The API is defined by three endpoinds:

## combined world stats
**https://localhost:3000/world**

```json
{
	"worldStats":
	{
		"confirmed": 2971475,
		"deaths": 206544,
		"recovered": 865733,
		"countriesAffected": 185,
		"lastUpdate": "2020-04-27 02:30:33"
	}
}
```

## countries stats
**https://localhost:3000/countries**

```json
{
	"countries":
	[
		{
			"id": 1,
			"country": "Albania",
			"state": "",
			"confirmed": 726,
			"deaths": 28,
			"recovered": 410,
			"lastUpdate": "2020-04-27 02:30:33"
		},
	]
}
```

Query parameter filtering available using country parameter

example: https://localhost:3000/countries?country=aus will return data for Austria and Australia

## places data, including state/province
**https://coronavirusapi.herokuapp.com/places**

```json
{
	"places":
	[
		{
			"id": 1,
			"country": "Albania",
			"state": "",
			"confirmed": 726,
			"deaths": 28,
			"recovered": 410,
			"lastUpdate": "2020-04-27 02:30:33"
		},
	]
}
```

Query parameter filtering available using country and state parameters.
