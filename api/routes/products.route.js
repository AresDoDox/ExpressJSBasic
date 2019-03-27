var express = require('express');

var controllers = require('../controllers/product.controller');

var router = express.Router();

router.get('/', controllers.index); //Route chứa middleware

// router.get('/search', controllers.search);

module.exports = router;