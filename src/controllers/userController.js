const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const usersDataBase = require('../data/users.json')
const bcryptjs = require('bcryptjs');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
const {validationResult} = require('express-validator');
const db = require('../data/models')
const usersService = require('../data/usersService')

const productsFilePath = path.join(__dirname, '../data/json-products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const userController = {
    viewProfile :async function (req, res) {
        usersService.viewProfile(req, res);        
    },
    saveUser: (req,res) => {
        usersService.createUser(req, res);
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

    editUserDb: function (req,res) {
        db.Users.findByPk(req.params.id
            .then(function(user){
                res.render('')
            })
        )
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


    deleteUserDb: function (req, res) {
        db.Users.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            if(user) {
                db.Users.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                res.redirect('/')
            }
        })
    },

    processLogin : function(req, res){

        usersService.processLogin(req, res);
    },

    check : function (req, res){
        if(req.session.userLogged)
            {
            res.send('usuario Logueado')
        }
        res.send('usuario NO Logueado')        
        },
    

    registerView: function (req, res) {
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

    logOut: function(req, res){
        usersService.logOut(req, res);
    },

    allUsers: async function(req, res){
        usersService.viewAllUsers(req, res);
    }
};

module.exports = userController;