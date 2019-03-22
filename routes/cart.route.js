var express = require('express');

var controllers = require('../controllers/cart.controller');

var router = express.Router();

router.get('/add/:productId', controllers.addToCart);

module.exports = router;