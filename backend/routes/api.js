'use strict';

var express = require('express');
var router = express.Router();
var api = require('../controllers/api.js');

router.get('/gifts', api.gifts);
router.get('/todos', api.todos);
router.get('/processed', api.processed);
router.post('/process', api.process);

module.exports = router;
