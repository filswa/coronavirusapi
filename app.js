var port = process.env.PORT || 3000;

global.XMLHttpRequest = require('xhr2');
const express = require('express');
const app = express();

//CORS wildcard
app.use(function (req, res, next) {
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
app.get('/', (req, res) => {
    res.send('Welcome to Coronavirus Statistics API');
})


app.listen(port);