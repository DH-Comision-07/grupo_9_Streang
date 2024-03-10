let express = require ('express');
let path = require ('path');

const cartController = {
    paginaCart: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/cart.html'))
    }
}


module.exports = cartController;