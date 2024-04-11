const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const usersDataBase = require('../data/users.json')
users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))

const userController = {
    viewProfile : function (req, res) {
        res.render("userProfile");
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
        }
        users.push(newUserInfo)
        let usersJSON = JSON.stringify(users)
        fs.writeFileSync(usersFilePath, usersJSON)
        res.send(usersJSON)
    },
    registerView: function (req,res) {
        res.render('register');
    },
};

module.exports = userController;