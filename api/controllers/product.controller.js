// var db = require('../db');
var Product = require('../../models/product.model');

module.exports.index = async function(req, res){
    var products = await Product.find();
    res.json(products);
};

// module.exports.search = async function(req, res){
//     var q = req.query.q;
//     var products = await Product.find();
//     var matchedProducts = products.filter(function(product){
//         if((product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1) ||
//             (product.description.toLowerCase().indexOf(q.toLowerCase()) !== -1)){
//             return product;
//         }
//     });
//     res.render('products/index', {
//         products: matchedProducts
//     });
// }