//Lấy dữ liệu và render
const shortid = require('shortid');
var db = require('../db');

var md5 = require('md5');

module.exports.index = function(req, res){
    res.render('users/index', {
        users: db.get('users').value()
    });
};

module.exports.search = function(req, res) {
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
}

module.exports.create =function(req,res){
    console.log(req.cookies);
    res.render('users/create');
}

module.exports.postCreate =function(req,res){
    req.body.id = shortid.generate(); //Hàm trả về giá trị id ngẫu nhiên
    req.body.avatar = req.file.path.split('/').slice(1).join('/'); // Lưu link lưu trữ file
    req.body.password = md5(req.body.password);
    db.get('users').push(req.body).write(); // 
    res.redirect('/users'); //Điều hướng sang url khác
}

module.exports.get =function(req,res){
    var id = req.params.id.toString();
    var user = db.get('users').find({id: id}).value(); // Lấy giá trị phần tử user theo id từ data
    res.render('users/view', {
        user:user
    });
}