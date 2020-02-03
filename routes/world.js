const DataFetch = require ('../data/DataFetch');
const WorldStats = require('../data/WorldStats');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    try {
        let data = WorldStats.getWorldData();  
        res.json({worldStats: data});        
    } catch (error) {
        res.json({message: error});
    }
});

module.exports = router;