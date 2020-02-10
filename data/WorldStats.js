let worldData = {
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    countriesAffected: 0,
    lastUpdate: "undefined"
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
    data.sort(function(firstEl, secondEl){
        if (firstEl[1].toLowerCase() < secondEl[1].toLowerCase()) return -1;
        if (firstEl[1].toLowerCase() > secondEl[1].toLowerCase()) return 1;
        return 0;
    })
    //console.log("scan fun data: " + JSON.stringify(data));
    let previousCountry = "";
    worldData.lastUpdate = data[0][2];

    // data.lenth-1 - temporary hacky workaround for last null element in data array
    for(i = 0; i < data.length; i++){
        currentCountry = data[i][1];
        worldData.confirmed += parseInt(data[i][3],10);
        worldData.deaths += parseInt(data[i][4], 10);
        worldData.recovered += parseInt(data[i][5], 10);
        worldData.countriesAffected += isPreviousCountryDuplicated(previousCountry, currentCountry);
        previousCountry = data[i][1];
    }
    return worldData;
}

function isPreviousCountryDuplicated(previousCountry, currentCountry){
    return (previousCountry == currentCountry) ? 0 : 1;
}

module.exports.scanForData = scanForData;