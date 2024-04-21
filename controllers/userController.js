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
            let user = users.find(user => user.id == req.session.userLogged.id);
            if(req.session.userLogged.rol != 'admin' || !req.session.userLogged.rol){
                res.render("userProfile", {user:user, products: products, users:users} );
            } else if (req.session.userLogged.rol == "admin") {
                res.render("adminProfile", {user:user, products: products, users:users});
            } else {
                res.send('Usuario no encontrado');
            }
        } catch(err){
            // res.redirect('/');
            res.send(req.session.userLogged)
        }
        
    },
    saveUser: (req,res) => {
        let maxId = 0;
        for (const obj of users) {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        }
    
        let resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render('register', {
                errors: resultValidation.mapped(),
                old: req.body});
        }

        // verificar si ambas pass del registro son iguales
        let hashedPass = bcryptjs.hashSync(req.body.password, 10);
        let equalPass = bcryptjs.compareSync(req.body.repPassword, hashedPass)

        // Si no se carga una image, guarda una imagen default
        let avatarImage = ""
        if(!req.file || req.file == undefined){
            avatarImage = "avatar-default.png"
        } else {
            avatarImage = req.file.filename;
        }

        if(equalPass){
            let newUserInfo = {
                id: maxId + 1,
                email: req.body.email,
                username: req.body.username,
                password: hashedPass,
                name: req.body.realName,
                surname: req.body.surname,
                birthDate: req.body.birthDate,
                avatar: avatarImage,
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
                email: req.body.email.toLowerCase(),
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

    processLogin : function(req, res){

        let userToLogin = users.find(user => user.email == req.body.email.toLowerCase());
       if(userToLogin){
        if(bcryptjs.compareSync(req.body.password, userToLogin.password)){
            req.session.userLogged = userToLogin;
            
            let user2 = req.session.userLogged;
            console.log(user2);
            res.redirect('/users/profile')
            
        } else {
            res.send("Credenciales invalidas");
        }
       }else{
        res.send("mail no encontrado")
       }
       
       if(req.session.userLogged){
        res.send(req.session.userLogged)
       } else {
        res.send("error");
       }
    },

    check : function (req, res){
        if(req.session.userLogged){
            res.send('usuario Logueado')
        }
        res.send('usuario NO Logueado')
    },

    registerView: function (req,res) {
        res.render('register');
    },
};

module.exports = userController;