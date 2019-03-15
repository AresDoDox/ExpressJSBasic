require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Khai báo route
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

// Khai báo Middleware
var middlewareAuth = require('./middlewares/auth.middleware');

var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));


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

app.use('/users', middlewareAuth.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, function(){
    console.log('Server listening on port ' + port);
});