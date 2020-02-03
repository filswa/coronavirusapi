const DataFetch = require ('../data/DataFetch');

let worldData = {
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    countriesAffected: 0,
    lastUpdate: "undefined"
}
//let confirmed, deaths, recovered, countriesAffected, lastUpdate;

function getWorldData () {
    let virusData = DataFetch.getVirusData();
    scanForData(virusData);
    return worldData;
} 

/*  Data structure in response:
    arr[0] - province/state
    arr[1] - country
    arr[2] - lastUpdate
    arr[3] - confirmed
    arr[4] - deaths
    arr[5] - recovered
*/
function scanForData(data){
    let previousCountry = "";
    worldData.lastUpdate = data[0][2];

    
    for(i = 0; i < data.length; i++){
        worldData.confirmed += parseInt(data[i][3],10);
        worldData.deaths += parseInt(data[i][4], 10);
        worldData.recovered += parseInt(data[i][5], 10);
        worldData.countriesAffected += countCountries(previousCountry, data[i][1]);
        previousCountry = data[i][1];
        console.log(worldData);
        console.log();
    }
}

function countCountries(previousCountry, currentCountry){
    return (previousCountry == currentCountry) ? 0 : 1;
}

module.exports.getWorldData = getWorldData;