let express = require ('express');
// let path = require ('path');
const products = require ('../data/json-products.json');

const mainController = {
    paginaPrincipal: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/home.html'));
        res.render("home", {products : products});
    }
}


module.exports = mainController;