const path = require('path');
const fs = require('fs');
const db = require('./models')
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');

const productsFilePath = path.join(__dirname, '../data/json-products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersService = {
    createUser: async function (req, res){
        try{       
            let resultValidation = validationResult(req);
    
            if(resultValidation.errors.length > 0){
                return res.render('register', {
                    errors: resultValidation.mapped(),
                    old: req.body
                });
            }


            let userExists = await db.Users.findOne({where:{
                email: req.body.email
            }});

            if(userExists != null){
                // res.send("El mail ingresado ya se encuentra registrado")
                return res.render('register', {
                    errors: {
                        email: {
                            msg: "Ese email ya está registrado"
                        }
                    },
                    old: req.body
                })
            }
          
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
                let user = await db.Users.create({
                        email: req.body.email.trim(),
                        user_name: req.body.username.trim(),
                        password: hashedPass,
                        name: req.body.realName.trim(),
                        last_name: req.body.surname.trim(),
                        birthdate: req.body.birthDate,
                        avatar: avatarImage,
                        rol_id: 1                
                    });
                res.redirect('/login')
            } else {
                res.status(400).json({ error: "Las contraseñas no coinciden." });
            }
                      
        } catch(error) {
            res.status(400).json({ error: "Ha ocurrido un error inesperado." });
        }
    },
    
    viewProfile: async function(req, res){
        try{
            if(req.session.userLogged && req.session.userLogged.rol_id == 2){
                let user = await db.Users.findByPk(req.session.userLogged.id);
                let users = await db.Users.findAll();
                console.log(req.session.userLogged);
                res.render('adminProfile', {user: user, products: products, users:users})
            } else if(req.session.userLogged && req.session.userLogged.rol_id == 1) {
                let user = await db.Users.findByPk(req.session.userLogged.id);
                res.render('userProfile', {user})
            } else {
                res.send('no se encontro sesion logueada')
            }            

        } catch(error) {
            console.log(error);
            res.status(400).json({"Ocurrio un error": error})

        }
    },

    processLogin: async function(req, res){
        const userToLogin = await db.Users.findOne({
            where:{
                email: req.body.email
            }
        });

        if(userToLogin == null){
            // res.send('Usuario no encontrado')
            return res.render('login', {
                errors: {
                    email: {
                        msg: "Usuario no encontrado"
                    }
                }
            })
        }

        if(bcryptjs.compareSync(req.body.password, userToLogin.password)){
            req.session.userLogged = userToLogin;
            if(req.body.Recordarme != undefined) {
            res.cookie('Recordarme', req.session.userLogged.email, {maxAge: 86400000})}
            res.redirect('/users/profile')
            
        } else {
            // res.send("Credenciales invalidas");
            return res.render('login', {
                errors: {
                    email: {
                        msg: "Credenciales inválidas"
                    }
                }
            })
        }
    },

    logOut: function(req, res){
        req.session.destroy();
        res.clearCookie("Recordarme")
        res.redirect('/')
    },

    viewAllUsers: async function(req, res){
        if(req.session.userLogged && req.session.userLogged.rol_id == 2){
            let users = await db.Users.findAll();
            res.render('allUsers', {users: users})
        } else {
            res.status(400).json({"error": "Ups! No tienes permiso para ver esta pagina"})
        }
    }
}

module.exports = usersService;