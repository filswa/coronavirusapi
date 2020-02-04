const DataFetch = require ('../data/DataFetch');
const WorldStats = require('../data/WorldStats');
const DataStore = require('../data/DataStore');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    try {
        let data = DataStore.getWorldData();  
        res.json({worldStats: data});        
    } catch (error) {
        res.json({message: error});
    }
});

module.exports = router;