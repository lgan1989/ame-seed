'use strict';

var express = require('express');
var router = express.Router();

router.use('/item1', require('./item1.js'));

module.exports = router;


