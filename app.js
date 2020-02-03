global.XMLHttpRequest = require('xhr2');
const express = require('express');
const app = express();

//Import Routes
const placesRoute = require('./routes/places');
const worldRoute = require('./routes/world');

app.use('/world', worldRoute);
app.use('/places', placesRoute);

//ROUTES
app.get('/', (req, res) => {
    res.send('Home');
})

// app.get('/world', (req, res) => {
//     res.send();
// })

app.listen(3000);