var User = require('../models/user.model');

module.exports.requireAuth = function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    
    //Kiểm tra giá trị cookie userId có tộn tại trong data ko? hay là giả mạo.
    var user = User.findById(req.signedCookies.userId);

    if(!user){
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;
    next(); //Không gặp lỗi nào thì kết thúc middleware và chuyển tới controller tiếp theo.
}