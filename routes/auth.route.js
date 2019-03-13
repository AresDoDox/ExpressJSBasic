var express = require('express');

var controllers = require('../controllers/auth.controller');

var router = express.Router();

router.get('/login', controllers.login);
router.post('/login', controllers.postLogin);

module.exports = router;