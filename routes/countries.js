const express = require('express');
const DataStore = require('../data/DataStore');

const router = express.Router();

// GET all countries. Include query string
router.get('/', (req, res) => {
    let country = req.query.country;
    try {
        let data = DataStore.getCountriesData();

        if(country != undefined){
            data = getDataFromCountryQuery(data, country);
        }

        res.json({countries: data});        
    } catch (error) {
        res.json({message: error});
    }
});

function getDataFromCountryQuery(data, queryParam){
    let result = data.filter(function(element){
        if(element.country.toLowerCase().includes(queryParam.toLowerCase())){
            return element;
        }
    });
    return result;
}

// GET country with a requested ID
router.get('/:id', (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let allCountries = DataStore.getCountriesData();
        let country = getCountryById(allCountries, id);
        if(country == undefined){
            res.statusCode = 404;
            res.json();
        }
        else{
            res.json({country: country});
        }        
    } catch(error) {
        res.json({message: error});
    }
});

function getCountryById(data, id){
    let result = data.find(function(element){
        if(element.id == id){
            return element;
        }
    })
    return result;
}

module.exports = router;