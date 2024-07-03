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
    },

    sendMessage: (req, res) => {
        let newMessage = {
            date : new Date(),
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        }
        messages.push(newMessage);
        let messagesJSON = JSON.stringify(messages);
        fs.writeFileSync(contactFilePath, messagesJSON);
        res.redirect('/');
    }
}


module.exports = mainController;