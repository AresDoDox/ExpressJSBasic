const shortid = require('shortid');

var Session = require('../models/session.model');

module.exports = function(req, res, next){
    var numProducts = 0;
    // if (!req.signedCookies.sessionId){
    //     var sessionId = shortid.generate();
    //     res.cookie('sessionId', sessionId, {
    //         signed: true
    //     });

    //     //Lưu vào data
    //     Session.push({
    //         id: sessionId
    //     }).write();
    // }else{
    //     var sessionId =req.signedCookies.sessionId;
    //     var sessionCart = Session.findOne({id: sessionId})
    //     if (sessionCart.cart){
    //         for (const countProduct in sessionCart.cart) {
    //             numProducts = numProducts + sessionCart.cart[countProduct];
    //         }
    //     }
    // }
    
    
    res.locals.numProducts = numProducts;
    next();
}