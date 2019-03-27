require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');

//connect mongo
mongoose.connect(process.env.MONGO_URL);

// Khai báo route
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var productApiRoute = require('./api/routes/products.route');

// Khai báo Middleware
var middlewareAuth = require('./middlewares/auth.middleware');
var middlewareSession = require('./middlewares/session.middleware');

var app = express();
var port = 1494;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(middlewareSession); //Ảnh hưởng đến tất cả
// app.use(csurf({ cookie: true }));


// Data
// var users = [
//     { id: 1, name: 'DoDox'},
//     { id: 2, name: 'KillLove'}
// ]
//end data

app.use(express.static('public')); 

app.get('/',function(req, res){
    res.render('index', {
        name: 'DoDox'
    });
});

//Api
app.use('/api/products', productApiRoute);


app.use('/users', middlewareAuth.requireAuth, userRoute);
app.use('/products', productRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);
app.use('/transfer', middlewareAuth.requireAuth, transferRoute);

app.listen(port, function(){
    console.log('Server listening on port ' + port);
});