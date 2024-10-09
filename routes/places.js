const express = require('express');
const DataStore = require('../data/DataStore');

const router = express.Router();

// GET all places. Include query string filtering
router.get('/', (req, res) => {
    let country = req.query.country;
    let state = req.query.state;
    try {
        let data = DataStore.getPlacesData();

        if(country !== undefined && state !== undefined){
            data = getDataFromBothQuery(data, country, state);
        }        
        else if(country){
            data = getDataFromCountryQuery(data, country);
        }
        else if(state){
            data = getDataFromStateQuery(data, state);
        }

        res.json({places: data});
    } catch(error) {
        res.json({message: error});
    }
});

function getDataFromBothQuery(data, country, state){
    let result = data.filter(function(element){
        if(element.country.toLowerCase().includes(country.toLowerCase())){
            return element;
        }
        if(element.state.toLowerCase().includes(state.toLowerCase())){
            return element;
        }
    });
    return result;
}

function getDataFromCountryQuery(data, queryParam){
    let result = data.filter(function(element){
        if(element.country.toLowerCase().includes(queryParam.toLowerCase())){
            return element;
        }
    });
    return result;
}

function getDataFromStateQuery(data, queryParam){
    let result = data.filter(function(element){
        if(element.state.toLowerCase().includes(queryParam.toLowerCase())){
            return element;
        }
    });
    return result;
}

// GET place with a requested ID
router.get('/:id', (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let allPlaces = DataStore.getPlacesData();
        let place = getPlaceById(allPlaces, id);

        if(place == undefined){
            res.statusCode = 404;
            res.json();
        }
        else{
            res.json({place: place});
        }        
    } catch(error) {
        res.json({message: error});
    }
});

function getPlaceById(data, id){
    let result = data.find(function(element){
        if(element.id == id){
            return element;
        }
    })
    return result;
}

module.exports = router;