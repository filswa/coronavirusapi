const express = require('express');
const DataStore = require('../data/DataStore');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req);
    try {
        let id = parseInt(req.param);
        let allPlaces = DataStore.getCountriesData();
        let place = getPlaceById(allPlaces, id);
        res.json({place: place});
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