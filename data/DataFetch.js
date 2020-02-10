const Papa = require('papaparse');
const DataStore = require('./DataStore');
const WorldStats = require('./WorldStats');
const PlacesStats = require('./PlacesStats');

let virusData = {};

function FetchDataFromCsv(){
    console.log("Fetching data...");
    Papa.parse("https://raw.githubusercontent.com/CSSEGISandData/2019-nCoV/master/daily_case_updates/02-10-2020_1030.csv",{
            download: true,
            complete: function(results){
                virusData = results.data;
                //console.log(virusData);
                removeMetaData(virusData);

                let worldData = WorldStats.scanForData(virusData);
                let placesData = PlacesStats.scanForData(virusData);

                DataStore.setWorldData(worldData);
                DataStore.setCountriesData(placesData);
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
