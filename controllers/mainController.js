let express = require ('express');
// let path = require ('path');

const mainController = {
    paginaPrincipal: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/home.html'));
        res.render("home");
    }
}


module.exports = mainController;