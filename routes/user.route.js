var express = require('express');
var multer  = require('multer');

var controllers = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var upload = multer({ dest: './public/uploads/' }); //Tạo object để upload file, sử dụng thư viện multer

// Khai báo Middleware
var middlewareAuth = require('../middlewares/auth.middleware');

var router = express.Router();


router.get('/', middlewareAuth.requireAuth, controllers.index); //Route chứa middleware

router.get('/cookie', function(req,res,next){
    res.cookie('name','DoDox');
    res.send('Set Cookie');
} )

//Tìm kiếm
router.get('/search', controllers.search);

//Method POST
router.get('/create', controllers.create);

router.post('/create',
    upload.single('avatar'),
    validate.postCreate, 
    controllers.postCreate
);

//User id
router.get('/:id', controllers.get);

module.exports = router;