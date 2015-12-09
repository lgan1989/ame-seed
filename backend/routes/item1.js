'use strict';

var express = require('express');
var router = express.Router();
var item1 = require('../controllers/item1.js');

router.get('/', item1.view);

module.exports = router;


