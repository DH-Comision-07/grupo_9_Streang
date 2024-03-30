let express = require ('express');
const products = require ('../data/json-products.json');

const mainController = {
    paginaPrincipal: (req, res) => {
        res.render("home", {products : products});
    },
    
    search : function(req, res) {
        try{
            let searched = req.query.query_search;
            let result = products.filter(product => product.name.toLowerCase().includes(searched.toLowerCase()));
            res.render("search", {result: result});
        } catch{
            res.status(404).send('Producto no encontrado')
        }        
    },

    paginaRegister: (req, res) => {
        res.render("register");
    },

    paginaLogin: (req, res) => {
        res.render("login");
    },

    paginaCart: (req, res) => {
        res.render("cart");
    }
}


module.exports = mainController;