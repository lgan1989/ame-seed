'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();

router.use('/item1', require('./item1.js'));

router.get('/partials/*', function(req, res){
    var stripped = req.url.split('.')[0];
    var requestedView = path.join('./', stripped);
    console.log(requestedView);
    res.render(requestedView, function (err, html) {
        if (err) {
            res.status(404);
            res.send(404);
        } else {
            res.send(html);
        }
    });
});

router.get('/*', function(req, res){
    res.render('index', {});
});

module.exports = router;


