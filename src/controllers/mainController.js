const path = require('path');
const fs = require('fs');
const productsService = require('../data/productsService');

const mainController = {
    paginaPrincipal: async (req, res) => {
        let products = await productsService.getAll();
        res.render("home", {products : products});
    },

    paginaRegister: (req, res) => {
        res.render("register");
    },

    paginaLogin: (req, res) => {
        res.render("login");
    },

    paginaCart: (req, res) => {
        res.render("cart");
    },

    contact: (req, res) => {
        res.render("contact");
    }
}


module.exports = mainController;