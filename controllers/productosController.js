const productsService = require('../data/productsService');

const productosController = { 
    viewAll: function (req, res) {
        res.render('allProducts', productsService.getAll());
    },

    productDetail: function (req, res) {
        res.render("productDetail", productsService.getOne(req.params.id));            
    },
    
    viewCategory: function(req, res) {
        let category = req.params.category;
        res.render("search", productsService.viewCategory(category));            
    },
    
    newProduct: (req, res) => {
        res.render("newProduct");
    },

    create: function(req, res){
        productsService.create(req);
        res.redirect('/');
    },

    viewEdit: function(req, res){
        res.render("editProduct", productsService.viewEdit(req.params.id));
    },

    edit: function(req, res){
        productsService.edit(req);
        res.redirect('/');
    },

    delete: function(req, res){
        productsService.delete(req.params.id);
        res.redirect('/products');
    },

    viewDiscounts: function(req, res){
        res.render('discounts', productsService.viewDiscounts());
    }
};

module.exports = productosController;
