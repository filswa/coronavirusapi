const DataFetch = require ('../data/DataFetch');

let placesData = {}

/*  Data structure in response:
    arr[0] - province/state
    arr[1] - country
    arr[2] - lastUpdate
    arr[3] - confirmed
    arr[4] - deaths
    arr[5] - recovered
*/
function scanForData(data){
    console.log("scan fun data: " + JSON.stringify(data));
    placesData = data;
    return placesData;
}

module.exports.scanForData = scanForData;