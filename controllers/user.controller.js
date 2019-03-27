//Lấy dữ liệu và render
// const shortid = require('shortid');
var User = require('../models/user.model');

var md5 = require('md5');

module.exports.index = async function(req, res){
    var users = await User.find();
    res.render('users/index', {
        users: users
    });
};

module.exports.search = async function(req, res) {
    var users = await User.find();
    var q = req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    // toLowerString() Chuyển chuỗi hiện tại thành chuỗi chữ thường
    // indexOf(q) Kiểm tra trong chuổi tồn tại biến q không (không tồn tại trả về giá trị -1)
    
    res.render('users/index', {
        users: matchedUsers
    });
}

module.exports.create = function(req, res ,next){
    res.render('users/create');
}

module.exports.postCreate = async function(req,res){
    // req.body.id = shortid.generate(); //Hàm trả về giá trị id ngẫu nhiên
    req.body.avatar = req.file.path.split('/').slice(1).join('/'); // Lưu link lưu trữ file
    req.body.password = md5(req.body.password);
    User.insertMany([req.body]) //Push dữ liệu và database
    res.redirect('/users'); //Điều hướng sang url khác
}

module.exports.get = async function(req,res){
    var id = req.params.id.toString();
    var user = await User.findById(id); // Lấy giá trị phần tử user theo id từ data
    res.render('users/view', {
        user : user
    });
}