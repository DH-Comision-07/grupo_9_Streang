let express = require ('express');
// let path = require ('path');
const products = require ('../data/json-products.json');

const mainController = {
    paginaPrincipal: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/home.html'));
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
        
    }
}


module.exports = mainController;