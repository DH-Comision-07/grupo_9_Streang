const productsService = require('../data/productsService');
const productosController = { 
    viewAll: function (req, res) {
        // console.log(productsService.getAll());
        productsService.getAll(req, res);
    },

    check: function(req, res){
        res.send(productsService.check(req));
    },

    productDetail: function (req, res) {
        productsService.getOne(req, res);
    },

    // Falta viewCategory
    
    viewCategory: function(req, res) {
        let category = req.params.category;
        res.render("search", productsService.viewCategory(category));            
    },
    
    newProduct: (req, res) => {
        if(req.session.userLogged && req.session.userLogged.rol_id == 2){
            res.render("newProduct");
        } else {
            res.send("Upss! No posees permisos para ver esta página.")
        }        
    },

    create: function(req, res){
        productsService.create(req);
        res.redirect('/');
    },

    viewEdit: function(req, res){
        if(req.session.userLogged && req.session.userLogged.rol_id == 2){
            productsService.viewEdit(req, res);
        } else {
            res.send("Upss! No posees permisos para ver esta página.")
        }
    },

    edit: function(req, res){        
        productsService.edit(req);
        res.redirect('/products');        
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
