const shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next){
    if (!req.signedCookies.sessionId){
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });

        //Lưu vào data
        db.get('sessions').push({
            id: sessionId
        }).write();
    }

    next();
}