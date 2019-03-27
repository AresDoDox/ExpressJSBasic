var Session = require('../models/session.model');

module.exports.addToCart = function(req, res, next){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId){
        res.redirect('/products');
        return;
    }

    var count = Session.findById(sessionId)
        .get('cart.' + productId, 0);

    Session.findById(sessionId)
        .set('cart.' + productId, count + 1)
        .write();
    res.redirect('/products');

    
}