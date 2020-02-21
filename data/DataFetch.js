const Papa = require('papaparse');
const Axios = require('axios');
const DataStore = require('./DataStore');
const WorldStats = require('./WorldStats');
const PlacesStats = require('./PlacesStats');
const CountriesStats = require('./CountriesStats');

let dataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/02-20-2020.csv";

let virusData = {};

function FetchDataFromCsv(){
    console.log("Fetching data...");
    Papa.parse(dataUrl,{
            download: true,
            complete: function(results){
                virusData = results.data;
                console.log(virusData);
                removeMetaData(virusData);
                removeUndefinedElements(virusData);

                let worldData = WorldStats.scanForData(virusData);
                let placesData = PlacesStats.scanForData(virusData);
                let countriesData = CountriesStats.scanForData(virusData);

                // console.log(countriesData);

                DataStore.setWorldData(worldData);
                DataStore.setPlacesData(placesData);
                DataStore.setCountriesData(countriesData);
            }
        });
}; FetchDataFromCsv();

// TODO: Periodical fetching of latest data
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
