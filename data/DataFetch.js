const Papa = require('papaparse');
let virusData;

function FetchDataFromCsv(){
    Papa.parse("https://docs.google.com/spreadsheets/d/1wQVypefm946ch4XDp37uZ-wartW4V7ILdg-qYiDXUHM/export?format=csv",{
            download: true,
            complete: function(results){
                virusData = results.data;
                removeMetaData(virusData);
            }
        });
}; FetchDataFromCsv();

function getVirusData(){
    return virusData;
}

function removeMetaData(data){
    data.splice(0,1);
}

module.exports.getVirusData = getVirusData;