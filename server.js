'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var routes = require('./backend/routes');

app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride());


//app.use(require('connect-livereload')());
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
