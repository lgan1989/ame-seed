'use strict';

var path = require('path');
var gifts = [{
    id: 0,
    name: 'Big Cake',
    description: 'a big cake with some choclote',
    image: 'https://img.clipartfest.com/e956c2838e55be7171b0fafdb6470a46_chocolate-cake-with-candles-chocolate-cake-clipart-png_564-542.jpeg'
}, {
    id: 1,
    name: 'Big Baloon',
    description: 'a big baloon with cute drawing',
    image: 'http://pngimg.com/uploads/balloon/balloon_PNG4956.png'
}];

var todos = [{
    id: 1,
    recipient: 'ted.bobby@gmail.com',
    name: 'Ted',
    type: 0,
    created: '2017-03-20T16:00:00Z'
}, {
    id: 2,
    recipient: 'bill.wong@gmail.com',
    name: 'Bill',
    type: 0,
    created: '2017-03-20T16:10:00Z'
}, {
    id: 3,
    recipient: 'lucas.tam@gmail.com',
    name: 'Lucas',
    type: 1,
    created: '2017-03-20T16:05:00Z'
}];

var processed = [{
    id: 1,
    recipient: 'ted.bobby@gmail.com',
    type: 0,
    content: '',
    processed: '2017/03/01'
}, {
    id: 2,
    recipient: 'bill.wong@gmail.com',
    type: 0,
    content: '',
    processed: '2017/03/01'
}, {
    id: 3,
    recipient: 'lucas.tam@gmail.com',
    type: 1,
    content: '',
    processed: '2017/03/01'
}];

exports.gifts = function(req, res) {
    res.json(items);
};

exports.todos = function(req, res) {
    res.json(todos);
};

exports.processed = function(req, res) {
    res.json(processed);
};

exports.process = function(req, res) {

}
