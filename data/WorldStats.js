let worldData = {
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    countriesAffected: 0,
    lastUpdate: "undefined"
}

/*  Data structure in response:
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
    data.sort(function(firstEl, secondEl){
        if (firstEl[3].toLowerCase() < secondEl[3].toLowerCase()) return -1;
        if (firstEl[3].toLowerCase() > secondEl[3].toLowerCase()) return 1;
        return 0;
    })
    //console.log("scan fun data: " + JSON.stringify(data));
    let previousCountry = "";
    worldData.lastUpdate = data[0][4];

    // data.lenth-1 - temporary hacky workaround for last null element in data array
    for(i = 0; i < data.length; i++){
        currentCountry = data[i][3];
        worldData.confirmed += parseInt(data[i][7],10);
        worldData.deaths += parseInt(data[i][8], 10);
        worldData.recovered += parseInt(data[i][9], 10);
        worldData.countriesAffected += isPreviousCountryDuplicated(previousCountry, currentCountry);
        previousCountry = data[i][3];
    }
    return worldData;
}

function isPreviousCountryDuplicated(previousCountry, currentCountry){
    return (previousCountry == currentCountry) ? 0 : 1;
}

module.exports.scanForData = scanForData;