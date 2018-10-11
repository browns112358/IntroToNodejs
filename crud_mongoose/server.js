const express = require('express'); 
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/edx-course-db',
      {useMongoClient: true});

let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

const Account = mongoose.model('account', 
    {   name: String,
        balance: Number
    }, 
);

app.get('/accounts', (req, res, next) => {
    Account.find(function (err, account) {
            if (err) return console.error(err);
            console.log(`The account is ${account}`);
            res.send(account);
    });
});

app.post('/accounts', (req, res, next) => {
    var newaccount = new Account(req.body);
    newaccount.save(function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('The account is saved: ', newaccount.toJSON())
        res.send("Account added");
      }
    });
});

app.put('/accounts/:id', (req, res, next) => {
    var conditions = {_id: req.params.id};
    var options = {multi: false};
    Account.update(conditions, req.body, options, (error, results) => {
        if (error) return console.error(error)
        res.send(results);
    });
});

app.delete('/accounts/:id', (req, res, next) => {
    var conditions = {_id: req.params.id};
    Account.remove(conditions, (err, results) => {
        if (err) return console.error(err);
        res.send(results);
    });
});

app.use(errorhandler());
app.listen(3000);
