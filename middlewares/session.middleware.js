const shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next){
    var numProducts = 0;
    if (!req.signedCookies.sessionId){
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });

        //Lưu vào data
        db.get('sessions').push({
            id: sessionId
        }).write();
    }else{
        var sessionId =req.signedCookies.sessionId;
        var sessionCart = db.get('sessions').find({id: sessionId}).value();
        if (sessionCart.cart){
            for (const countProduct in sessionCart.cart) {
                numProducts = numProducts + sessionCart.cart[countProduct];
            }
        }
    }
    
    
    res.locals.numProducts = numProducts;
    next();
}