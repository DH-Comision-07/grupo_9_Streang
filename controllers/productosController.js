let express = require ('express');
let path = require ('path');

const productosController = { 
    paginaProductos: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/productDetail.html'))
    }
};

module.exports = productosController;
