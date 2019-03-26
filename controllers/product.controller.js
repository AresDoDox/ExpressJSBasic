// var db = require('../db');
var Product = require('../models/product.model');

module.exports.index = async function(req, res){
    // var page = parseInt(req.query.page) || 1; //n
    // var perPage = 8; //x
    // var countPage = Math.ceil(db.get('products').value().length / perPage); //Tổng số trang
    // var start = (page - 1) * perPage;
    // var end = page * perPage;
    // res.render('products/index', {
    //     products: db.get('products').value().slice(start,end),
    //     page: page,
    //     countPage: countPage
    // });

    var products = await Product.find();
    res.render('products/index', {
        products: products
    });
};

module.exports.search = async function(req, res){
    var q = req.query.q;
    var products = await Product.find();
    var matchedProducts = products.filter(function(product){
        if((product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1) ||
            (product.description.toLowerCase().indexOf(q.toLowerCase()) !== -1)){
            return product;
        }
    });
    res.render('products/index', {
        products: matchedProducts
    });
}