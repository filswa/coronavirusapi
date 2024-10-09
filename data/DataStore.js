let worldData = {
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    countriesAffected: 0,
    lastUpdate: "undefined"
}

let placesData = {};

let countriesData = {};

function getWorldData(){
    return worldData;
}

function setWorldData(data){
    worldData = data;
}


function getPlacesData(){
    return placesData;
}

function setPlacesData(data){
    placesData = data;
}

function getCountriesData(){
    return countriesData;
}

function setCountriesData(data){
    countriesData = data;
}

module.exports.getWorldData = getWorldData;
module.exports.setWorldData = setWorldData;
module.exports.getPlacesData = getPlacesData;
module.exports.setPlacesData = setPlacesData;
module.exports.getCountriesData = getCountriesData;
module.exports.setCountriesData = setCountriesData;
