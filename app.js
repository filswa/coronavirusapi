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
const placesRoute = require('./routes/places');
const worldRoute = require('./routes/world');

app.use('/world', worldRoute);
app.use('/places', placesRoute);

//ROUTES
app.get('/', (req, res) => {
    res.send('Home');
})

app.listen(port);