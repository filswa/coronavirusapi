let worldData = {
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    countriesAffected: 0,
    lastUpdate: "undefined"
}

let countriesData = {}

function getWorldData(){
    return worldData;
}

function setWorldData(data){
    worldData = data;
}

function getCountriesData(){
    return countriesData;
}

function setCountriesData(data){
    countriesData = data;
}

// module.exports.worldData = worldData;
// module.exports.countriesData = countriesData;

module.exports.getCountriesData = getCountriesData;
module.exports.setCountriesData = setCountriesData;
module.exports.getWorldData = getWorldData;
module.exports.setWorldData = setWorldData;
