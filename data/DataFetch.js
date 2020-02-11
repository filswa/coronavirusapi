const Papa = require('papaparse');
const Axios = require('axios');
const DataStore = require('./DataStore');
const WorldStats = require('./WorldStats');
const PlacesStats = require('./PlacesStats');
const CountriesStats = require('./CountriesStats');

let dataURL = ""
let githubUrl = "https://github.com/CSSEGISandData/2019-nCoV/tree/master/daily_case_updates";

let virusData = {};

function FetchDataFromCsv(){
    console.log("Fetching data...");
    Papa.parse("https://raw.githubusercontent.com/CSSEGISandData/2019-nCoV/master/daily_case_updates/02-10-2020_1930.csv",{
            download: true,
            complete: function(results){
                virusData = results.data;
                removeMetaData(virusData);
                removeUndefinedElements(virusData);

                let worldData = WorldStats.scanForData(virusData);
                let placesData = PlacesStats.scanForData(virusData);
                let countriesData = CountriesStats.scanForData(virusData);

                // console.log(virusData);
                // console.log(countriesData);

                DataStore.setWorldData(worldData);
                DataStore.setPlacesData(placesData);
                DataStore.setCountriesData(countriesData);
            }
        });
}; FetchDataFromCsv();

function getlatestDataUrl(){
    Axios.get(githubUrl)
      .then(response => {
        console.log(response.data);
        //return response.json();
      })
      .catch(error => {
        console.log(error);
      });
}

function getVirusData(){
    return virusData;
}

function removeMetaData(data){
    data.splice(0,1);
}

// Hacky workaround for undefined last element
function removeUndefinedElements(array){
    array.pop();
}

module.exports.getVirusData = getVirusData;
