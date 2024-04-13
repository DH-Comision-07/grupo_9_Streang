const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const usersDataBase = require('../data/users.json')
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))

const userController = {
    viewProfile : function (req, res) {
        let user = users.find(user => user.id == parseInt(req.params.id));
        res.render("userProfile", {user: user});
    },
    saveUser: (req,res) => {
        let maxId = 0;
        for (const obj of users) {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        }
        let newUserInfo = {
            id: maxId + 1,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            name: req.body.realName,
            surname: req.body.surname,
            birthdate: req.body.birthDate,
            avatar: req.file
        }
        users.push(newUserInfo)
        let usersJSON = JSON.stringify(users)
        fs.writeFileSync(usersFilePath, usersJSON)
        res.send(newUserInfo)
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