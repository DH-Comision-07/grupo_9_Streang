let express = require ('express');
// let path = require ('path');

const registerController = {
    paginaRegister: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/register.html'));
        res.render("register");
    }
};



module.exports = registerController;