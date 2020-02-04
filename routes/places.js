const express = require('express');
const DataStore = require('../data/DataStore');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.query);
    try {
        
        let data = DataStore.getCountriesData();
        res.json({places: data});
    } catch(error) {
        res.json({message: error});
    }
});

module.exports = router;