'use strict';

var path = require('path');
var items = [
    {title: 'item-1'},
    {title: 'item-2'},
    {title: 'item-3'}
];

exports.list = function(req, res){
    res.render('view', {title: 'Test', items: items});
};

exports.view = function(req, res){
    res.render('view', function(err, html){
        if (err){
            res.status(404);
            res.send(404);
        }
        else{
            res.send(html);
        }
    });
};
