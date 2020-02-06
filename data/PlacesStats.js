let placesData = [];

/*  Data structure in response:
    arr[0] - province/state
    arr[1] - country
    arr[2] - lastUpdate
    arr[3] - confirmed
    arr[4] - deaths
    arr[5] - recovered
*/
function scanForData(data){
    //console.log("scan fun data: " + JSON.stringify(data));
    for(let i = 0; i < data.length; i++){
        placesData[i] = {
            id: i,
            country: data[i][1],
            state: data[i][0],
            confirmed: parseInt(data[i][3],10),
            deaths: parseInt(data[i][4], 10),
            recovered: parseInt(data[i][5], 10),
            lastUpdate: data[i][2]
        }
    }
    return placesData;
}

module.exports.scanForData = scanForData;