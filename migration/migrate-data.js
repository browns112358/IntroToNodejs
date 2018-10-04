const mongodb= require('mongodb')
const async = require('async')

const url = 'mongodb://localhost:27017/edx-course-db';
var data = require('./m3-customer-data.json');
var addresses = require('./m3-customer-address-data.json');

let tasks = [];
//const numRun = parseInt(process.argv[2]);
const numRun = parseInt(process.argv[2], 10) || 1000

mongodb.MongoClient.connect(url, (error, db) => {
    if (error) return process.exit(1)
    data.forEach(function(datapoint, index, list) {
        data[index] = Object.assign(datapoint, addresses[index]);
        if (index % numRun == 0) { //if we have the required amount of unified JSON objects
            var finishInd = index+numRun;
            if (finishInd >= data.length) {
                finishInd = data.length;
            }
            tasks.push((callback) => {
                console.log("Adding ", index, ". Through ", finishInd, ". Length: ", data.length);
                db.collection('customers').insert(data.slice(index, finishInd), (error, results) => {
                    callback(error, results)
                });
            });
        }
    });
    console.log("starting tasks");
    async.parallel(tasks, (error, results) => {
        if (error) console.error(error)
        db.close();
    });
});
