let express = require ('express');
let path = require ('path');

const loginController = {
   paginaLogin: (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/login.html'))
}
};

module.exports = loginController;