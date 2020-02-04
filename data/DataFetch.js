const Papa = require('papaparse');
const DataStore = require('./DataStore');
const WorldStats = require('./WorldStats');
const PlacesStats = require('./PlacesStats');

let virusData = {};

function FetchDataFromCsv(){
    console.log("parsing...");
    Papa.parse("https://docs.google.com/spreadsheets/d/1wQVypefm946ch4XDp37uZ-wartW4V7ILdg-qYiDXUHM/export?format=csv",{
            download: true,
            complete: function(results){
                virusData = results.data;
                removeMetaData(virusData);

                console.log("Fetched virusData " + JSON.stringify(virusData));

                let worldData = WorldStats.scanForData(virusData);
                let placesData = PlacesStats.scanForData(virusData);

                DataStore.setWorldData(worldData);
                DataStore.setCountriesData(placesData);

                console.log(worldData);
            }
        });
}; FetchDataFromCsv();

function getVirusData(){
    return virusData;
}

function removeMetaData(data){
    data.splice(0,1);
}

module.exports.getVirusData = getVirusData;
