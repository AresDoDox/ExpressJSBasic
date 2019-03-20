var db = require('../db')

module.exports.requireAuth = function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    
    //Kiểm tra giá trị cookie userId có tộn tại trong data ko? hay là giả mạo.
    var user = db.get('users').find({ 
        id : req.signedCookies.userId
    }).value();

    if(!user){
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = user;

    next(); //Không gặp lỗi nào thì kết thúc middleware và chuyển tới controller tiếp theo.
}