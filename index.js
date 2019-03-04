var express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route');

var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Data
// var users = [
//     { id: 1, name: 'DoDox'},
//     { id: 2, name: 'KillLove'}
// ]
//end data



app.get('/',function(req, res){
    res.render('index', {
        name: 'DoDox'
    });
});

app.use('/users', userRoute);

app.listen(port, function(){
    console.log('Server listening on port ' + port);
});