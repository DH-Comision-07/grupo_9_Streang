const productsService = require('../data/productsService');
const productosController = { 
    viewAll: async function (req, res) {
        try{          
            let products = await productsService.getAll();  
            res.render('allProducts', {products: products});
        } catch(error) {
            console.log(error);
        }        
    },

    check: function(req, res){
        res.send(productsService.check(req));
    },

    productDetail: function (req, res) {
        productsService.getOne(req, res);
    },
    
    viewCategory: async function(req, res) {
        let category = await productsService.viewCategory(req.params.category);
        res.render("search", {result: category});            
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
        productsService.edit(req, res);
        res.redirect('/products');
    },

    delete: function(req, res){
        productsService.delete(req.params.id);
        res.redirect('/products');
    },

    viewDiscounts: async function(req, res){
        let products = await productsService.viewDiscounts();
        res.render('discounts', {products: products});
    },

    search : function(req, res) {
        productsService.search(req, res);        
    }
};

module.exports = productosController;
