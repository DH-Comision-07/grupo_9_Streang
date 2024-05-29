const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const usersDataBase = require('../data/users.json')
const bcryptjs = require('bcryptjs');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
const {validationResult} = require('express-validator');
const db = require('../data/models')

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

        // verificar si existe el mail
        let emailExists = false;
        for (let user of users) {
            if (req.body.email == user.email) {
                emailExists = true;
                res.send("Ya existe una cuenta asociada al correo electrónico ingresado");
                break;
                }
            }
        
        if(!emailExists){
            // verificar si ambas pass del registro son iguales
            let hashedPass = bcryptjs.hashSync(req.body.password, 10);
            let equalPass = bcryptjs.compareSync(req.body.repPassword, hashedPass)

            // Si no se carga una imagen, guarda una imagen default
            let avatarImage = ""
            if(!req.file || req.file == undefined){ 
                avatarImage = "avatar-default.png"
            } else {
                avatarImage = req.file.filename;
            }

            if(equalPass){
                let newUserInfo = {
                    id: maxId + 1,
                    email: req.body.email.trim(),
                    username: req.body.username.trim(),
                    password: hashedPass.trim(),
                    name: req.body.realName.trim(),
                    surname: req.body.surname.trim(),
                    birthDate: req.body.birthDate,
                    avatar: avatarImage,
                    rol: 'user'
                }
                users.push(newUserInfo)
                let usersJSON = JSON.stringify(users)
                fs.writeFileSync(usersFilePath, usersJSON)
                res.redirect('/login')
            } else {
                res.send("Las contraseñas no coinciden.");
            }
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
            console.log(req.file)
            avatarImage = req.file.filename;
        }
        
        if(equalPass){
            let userEdited = {
                id : parseInt(req.params.id),
                email: req.body.email.toLowerCase(),
                username: req.body.username.trim(),
                password: hashedPass.trim(),
                name: req.body.realName.trim(),
                surname: req.body.surname.trim(),
                birthDate: req.body.birthDate,
                avatar: avatarImage,
                rol: userToEdit.rol
            }            

            if(userIndex !== -1){
                users[userIndex] = userEdited;
                let usersJSON = JSON.stringify(users);
                fs.writeFileSync(usersFilePath, usersJSON);
                req.session.userLogged = userEdited;
                res.redirect(`/users/profile`);
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
            req.session.userLogged = null;
            res.redirect('/');
        } else {
            return 'Usuario no encontrado';
        }
    },

    processLogin : function(req, res){

        let userToLogin = users.find(user => user.email == req.body.email.toLowerCase().trim());
        if(userToLogin){
            // console.log(userToLogin)
            if(bcryptjs.compareSync(req.body.password, userToLogin.password)){
                req.session.userLogged = userToLogin;
                if(req.body.Recordarme != undefined) {
                res.cookie('Recordarme', req.session.userLogged.email, {maxAge: 86400000})}
                    let user2 = req.session.userLogged;
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
        if(req.session.userLogged)
            {
            res.send('usuario Logueado')
        }
        res.send('usuario NO Logueado')        
        },
    

    registerView: function (req,res) {
        res.render('register');
    },

    adminForm: function(req, res){

        let userIndex = users.findIndex(user => user.id == req.body.id);
        let userToEdit = users.find(user => user.id == req.body.id);

        if(req.body.admin == "admin"){
            userToEdit.rol = "admin";
            } else {
            userToEdit.rol = "user";
        }

        if(userIndex !== -1){
            users[userIndex] = userToEdit;
            let usersJSON = JSON.stringify(users);
            fs.writeFileSync(usersFilePath, usersJSON);
            res.redirect(`/users/profile`);
        }
    },

    exit: function(req, res){
        req.session.destroy();
        res.clearCookie("Recordarme")
        res.redirect('/')
    },

    allUsers: function(req, res){
        if(req.session.userLogged && req.session.userLogged.rol == "admin"){
            res.render('allUsers', {users: users})
        } else {
            res.send("Ups! No tienes permiso para ver esta pagina")
        }
        
    },

    DBtry: function(req, res){
        db.Users.findAll()
        .then(function(users){
            // console.log(users);
            res.render('DBtry', {users:users})
        })
        
    }
};

module.exports = userController;