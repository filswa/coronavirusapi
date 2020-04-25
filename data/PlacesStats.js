let placesData = [];

/*  Data structure in response:
    arr[1] - city
    arr[2] - province/state
    arr[3] - country
    arr[4] - lastUpdate
    arr[7] - confirmed
    arr[8] - deaths
    arr[9] - recovered
    arr[10] - active
    arr[11] - key
*/
function scanForData(data){
    //console.log("scan fun data: " + JSON.stringify(data));
    for(let i = 0; i < data.length; i++){
        placesData[i] = {
            id: i,
            country: data[i][3],
            state: data[i][2],
            confirmed: parseInt(data[i][7],10),
            deaths: parseInt(data[i][8], 10),
            recovered: parseInt(data[i][9], 10),
            lastUpdate: data[i][4]
        }
    }
    return placesData;
}

module.exports.scanForData = scanForData;