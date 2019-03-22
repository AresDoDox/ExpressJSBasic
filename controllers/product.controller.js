var db = require('../db');

module.exports.index = function(req, res){
    var page = parseInt(req.query.page) || 1; //n
    var perPage = 8; //x
    var countPage = Math.ceil(db.get('products').value().length / perPage); //Tổng số trang
    var start = (page - 1) * perPage;
    var end = page * perPage;
    res.render('products/index', {
        products: db.get('products').value().slice(start,end),
        page: page,
        countPage: countPage
    });
};

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedProducts = db.get('products').value().filter(function(product){
        if((product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1) ||
            (product.description.toLowerCase().indexOf(q.toLowerCase()) !== -1)){
            return product;
        }
    });
    res.render('products/index', {
        products: matchedProducts
    });
}