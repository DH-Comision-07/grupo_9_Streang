const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const usersDataBase = require('../data/users.json')
const bcryptjs = require('bcryptjs');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/json-products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const userController = {
    viewProfile : function (req, res) {
        
        try{
            let user = users.find(user => user.id == parseInt(req.params.id));
            if(user.rol != 'admin' || !user.rol){
                res.render("userProfile", {user:user, products: products, users:users} );
            } else if (user.rol == "admin") {
                res.render("adminProfile", {user:user, products: products, users:users});
            } else {
                res.send('Usuario no encontrado');
            }
        } catch(err){
            res.redirect('/');
        }
        
    },
    saveUser: (req,res) => {
        let maxId = 0;
        for (const obj of users) {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        }
        //express-validator
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('register', {
                errors: errors.array(),
                old: req.body});
            // res.send(errors);
        }

        // verificar si ambas pass del registro son iguales
        let hashedPass = bcryptjs.hashSync(req.body.password, 10);
        let equalPass = bcryptjs.compareSync(req.body.repPassword, hashedPass)

        if(equalPass){
            let newUserInfo = {
                id: maxId + 1,
                email: req.body.email,
                username: req.body.username,
                password: hashedPass,
                name: req.body.realName,
                surname: req.body.surname,
                birthDate: req.body.birthDate,
                avatar: req.file.filename,
                rol: 'user'
            }
            users.push(newUserInfo)
            let usersJSON = JSON.stringify(users)
            fs.writeFileSync(usersFilePath, usersJSON)
            res.send(newUserInfo)
        } else {
            res.send("Las contraseñas no coinciden.");
        }        
    },

    editUser: (req, res) => {
        let userIndex = users.findIndex(user => user.id == req.params.id);
        let userToEdit = users.find(user => user.id == req.params.id);

        let hashedPass = bcryptjs.hashSync(req.body.password, 10);
        let equalPass = bcryptjs.compareSync(req.body.repPassword, hashedPass);

        // validacion de imagen de avatar
        let avatarImage = "";
        if (!req.file || req.file == undefined){
            avatarImage = userToEdit.avatar;
        } else {
            avatarImage = req.file.filename;
        }
        
        if(equalPass){
            let userEdited = {
                id : parseInt(req.params.id),
                email: req.body.email,
                username: req.body.username,
                password: hashedPass,
                name: req.body.realName,
                surname: req.body.surname,
                birthDate: req.body.birthDate,
                avatar: avatarImage,
                rol: userToEdit.rol
            }
            
            if(userIndex !== -1){
                users[userIndex] = userEdited;
                let usersJSON = JSON.stringify(users);
                fs.writeFileSync(usersFilePath, usersJSON);
                res.redirect(`/users/profile/${userEdited.id}`);
            } else {
                return "User not found."
            }
        } else {
            res.send('Las contraseñas no coinciden.')
        }
    },

    deleteUser: (req, res) =>{
        let userIndex = users.findIndex(user => user.id == parseInt(req.params.id));
        if(userIndex !== -1){
            users.splice(userIndex, 1);
            let usersJSON = JSON.stringify(users);
            fs.writeFileSync(usersFilePath, usersJSON);
            res.redirect('/');
        } else {
            return 'Usuario no encontrado';
        }
    },

    registerView: function (req,res) {
        res.render('register');
    },
};

module.exports = userController;