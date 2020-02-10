const express = require('express');
const DataStore = require('../data/DataStore');

const router = express.Router();

// GET all countries. Include query string
router.get('/', (req, res) => {
	console.log(req.query);
	let country = req.query.country;
	console.log(country);
    try {
        let data = DataStore.getCountriesData();

        if(country != undefined){
            data = getDataFromCountryQuery(data, country);
        }
        console.log(data);

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
    console.log(req.params.id)
    try {
        let id = parseInt(req.params.id);
        let allCountries = DataStore.getCountriesData();
        let country = getCountryById(allCountries, id);
        console.log(country);
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