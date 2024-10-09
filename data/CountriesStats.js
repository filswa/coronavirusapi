let countriesData = []

/*  Data structure in response:
    arr[2] - province/state
    arr[3] - country
    arr[4] - lastUpdate
    arr[7] - confirmed
    arr[8] - deaths
    arr[9] - recovered
    arr[10] - active
    arr[11] - key

    description: Go through the countries and summarize
    statistics belonging to each country
    [in] - list of all places
    [out] - list of countries with summarized values

*/
function scanForData(data){
    data.sort(function(firstEl, secondEl){
        if (firstEl[3].toLowerCase() < secondEl[3].toLowerCase()) return -1;
        if (firstEl[3].toLowerCase() > secondEl[3].toLowerCase()) return 1;
        return 0;
    })
    // console.log("scan fun data: " + JSON.stringify(data));

    let j = 0;
    //let previousCountry = "";
    let confirmedAccu = 0;
    let deathsAccu = 0;
    let recoveredAccu = 0;
    let currentCountry, previousCountry = data[0][3];

    for(i = 0; i < data.length; i++){
        currentCountry = data[i][3];
        if(isCountryChanged(previousCountry, currentCountry))
        {
            confirmedAccu = 0;
            deathsAccu = 0;
            recoveredAccu = 0;
            j++;
        }

        confirmedAccu += parseInt(data[i][7],10);
        deathsAccu += parseInt(data[i][8], 10);
        recoveredAccu += parseInt(data[i][9], 10);

        countriesData[j] = {
            id: j,
            country: currentCountry,
            confirmed: confirmedAccu,
            deaths: deathsAccu,
            recovered: recoveredAccu,
            lastUpdate: data[i][4]
        }
        previousCountry = currentCountry;
    }
    return countriesData;
}

function isCountryChanged(previousCountry, currentCountry){
    return (previousCountry == currentCountry) ? 0 : 1;
}

module.exports.scanForData = scanForData;