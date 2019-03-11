var express = require('express');

var controllers = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var router = express.Router();

router.get('/', controllers.index);

router.get('/cookie', function(req,res,next){
    res.cookie('name','DoDox');
    res.send('Set Cookie');
} )

//Tìm kiếm
router.get('/search', controllers.search);

//Method POST
router.get('/create', controllers.create);

router.post('/create', validate.postCreate, controllers.postCreate);

//User id
router.get('/:id', controllers.get);

module.exports = router;