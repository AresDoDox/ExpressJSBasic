var express = require('express');

var controllers = require('../controllers/product.controller');

var router = express.Router();

router.get('/', controllers.index); //Route chứa middleware

module.exports = router;