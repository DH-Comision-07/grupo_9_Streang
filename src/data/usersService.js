const path = require('path');
const fs = require('fs');
const db = require('./models')
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');

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
    DBtrycreate: async function(req, res){    
        try {
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
            // console.log(user)
            return user;
    } catch(err){
            console.log("Ocurrio un error: " + err);
            return err;
        }
    }
}

module.exports = usersService;