var port = process.env.PORT || 3000;

global.XMLHttpRequest = require('xhr2');
const express = require('express');
const app = express();

//CORS wildcard
app.use(function (_req, res, next) {
    res.setHeader('Acces-Control-Allow-Origin', '*');
    next();
});

//Import Routes
const worldRoute = require('./routes/world');
const placesRoute = require('./routes/places');
const countriesRoute = require('./routes/countries');

app.use('/world', worldRoute);
app.use('/places', placesRoute);
app.use('/countries', countriesRoute);

// Home Route
app.get('/', (_req, res) => {
    res.send({
        text: 'Welcome to Coronavirus Statistics API. This API is Legacy Mode, latest data entry is from "01-12-2024". Available endpoints:',
        world: 'localhost:3000/world',
        countries: 'localhost:3000/countries',
        countriesQuery: 'localhost:3000/countries?country=po',
        places: 'localhost:3000/places',
        placesQuery: 'localhost:3000/places?state=ala'
    });
})


app.listen(port);