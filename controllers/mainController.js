const products = require ('../data/json-products.json');
const path = require('path');
const fs = require('fs');

const contactFilePath = path.join(__dirname, '../data/contact.json');
const messages = JSON.parse(fs.readFileSync(contactFilePath, 'utf-8'));

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
        console.log(newMessage);
        // res.redirect('/');
        res.send(messagesJSON)
    }
}


module.exports = mainController;