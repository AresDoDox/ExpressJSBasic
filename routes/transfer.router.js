var express = require('express');

var controllers = require('../controllers/transfer.controller');

var router = express.Router();

router.get('/create', controllers.create);
router.post('/create', controllers.postCreate);
 
module.exports = router;