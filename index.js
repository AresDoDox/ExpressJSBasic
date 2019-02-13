var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

//lowdb
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);


// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Data
var users = [
    { id: 1, name: 'DoDox'},
    { id: 2, name: 'KillLove'}
]
//end data

app.listen(port, function(){
    console.log('Server listening on port ' + port);
});

app.get('/',function(req, res){
    res.render('index', {
        name: 'DoDox'
    });
});

app.get('/users',function(req, res){
    res.render('users/index', {
        users: db.get('users').value()
    });
});

//Tìm kiếm
app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    // toLowerString() Chuyển chuỗi hiện tại thành chuỗi chữ thường
    // indexOf(q) Kiểm tra trong chuổi tồn tại biến q không (không tồn tại trả về giá trị -1)
    res.render('users/index', {
        users: matchedUsers
    });
    // console.log(req.query);
    // res.send('abc');
});

//Method POST
app.get('/users/create', function(req,res){
    res.render('users/create');
});
app.post('/users/create', function(req,res){
    // console.log(req.body);
    db.get('users').push(req.body).write(); // 
    res.redirect('/users'); //Điều hướng sang url khác
});