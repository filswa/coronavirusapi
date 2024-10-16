const Papa = require('papaparse');
const Axios = require('axios');
const DataStore = require('./DataStore');
const WorldStats = require('./WorldStats');
const PlacesStats = require('./PlacesStats');
const CountriesStats = require('./CountriesStats');

/*  John Hopkins University stopped colletcting and uploading data
    by end of year 2023, so a hardcoded value is needed to get any data  */
const magicDate = "01-12-2023"
const githubUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/refs/heads/master/csse_covid_19_data/csse_covid_19_daily_reports/";

// Raw Data Example
// https://raw.githubusercontent.com/CSSEGISandData/COVID-19/refs/heads/master/csse_covid_19_data/csse_covid_19_daily_reports/01-10-2023.csv

async function FetchDataFromCsv(){
    console.log("Fetching data...");
    let dataUrl = await getLatestDataUrl(githubUrl)
    Papa.parse(dataUrl,{
            download: true,
            complete: function(results){
                virusData = results.data;
                removeMetaData(virusData);
                removeUndefinedElements(virusData);
                
                //console.log(virusData);
                
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

async function getLatestDataUrl(githubUrl){   
    // date === "01-12-2023" - hardcoded, see comment at the top
    let date = new Date(magicDate)

    // Month formatted from 0-11
    let month = date.getUTCMonth()+1
    month = month.toString()

    // -1, because the data is published with 1 day delay
    let day = date.getUTCDate()-1
    day = day.toString()

    let year = date.getUTCFullYear().toString()

    // day/month URL must be 2 digits
    if(day.length == 1){
        day = "0" + day
    }   
    if(month.length == 1){
        month = "0" + month
    }

    let dateString = getDateString(month, day, year)
    let query = getQuery(dateString)
    
    query = await Axios.get(query)
      .then(response => {
        console.log(response.status)
        console.log("success")
        return query
      })
      .catch(error => {
        console.log(error);
        console.log("failure. trying to get previous day... ")
        day = (parseInt(day)-1).toString()
        dateString = getDateString(month, day, year)
        query = getQuery(dateString)
        return query
      });
      return query
}

function getDateString(month, day, year){
    return `${month}-${day}-${year}`
}

function getQuery(dateString){
    return githubUrl + dateString + ".csv"
}

function removeMetaData(data){
    data.splice(0,1);
}

// Hacky workaround for undefined last element
function removeUndefinedElements(array){
    array.pop();
}