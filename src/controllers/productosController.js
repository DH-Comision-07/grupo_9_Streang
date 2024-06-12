const productsService = require('../data/productsService');
const { validationResult } = require('express-validator')
const productosController = { 
    viewAll: function (req, res) {
        // console.log(productsService.getAll());
        res.render('allProducts', productsService.getAll(req));
    },

    check: function(req, res){
        res.send(productsService.check(req));
    },

    productDetail: function (req, res) {
        res.render("productDetail", productsService.getOne(req.params.id));
    },
    
    viewCategory: function(req, res) {
        let category = req.params.category;
        res.render("search", productsService.viewCategory(category));            
    },
    
    newProduct: (req, res) => {
        if(req.session.userLogged && req.session.userLogged.rol == "admin"){
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
        if(req.session.userLogged && req.session.userLogged.rol == "admin"){
            res.render("editProduct", productsService.viewEdit(req.params.id));
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
    },

    productValidation: function(req, res){
        let resultValidation = validationResult(req);

        if(resultValidation.errors.length < 0){
            productosController.create({

            })
            .then(function(){
                res.render('/')
            })
        }else{
            return res.render('create', {errors: resultValidation.mapped})
        }
    }
};

module.exports = productosController;
