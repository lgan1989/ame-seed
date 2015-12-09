'use strict';

var express = require('express');
var app = express();

var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var routes = require('./backend/routes');


mongoose.connect('mongodb://localhost/test');

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride());


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/frontend/views');
app.use(express.static(__dirname + '/frontend'));
app.use('/', routes);


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Someone is listening at http://%s:%s', host, port);
});

module.exports = app;
