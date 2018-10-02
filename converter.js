const csvtojson = require('csvtojson');
const path = require('path');
const fs = require('fs');

const csvFilePath = path.join(__dirname, 'customer-data.csv');
csvtojson()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        fs.writeFileSync(path.join(__dirname, 'customer-data.json'), JSON.stringify(jsonObj), 'utf-8');
    });
