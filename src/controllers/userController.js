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
        usersService.editUser(req, res);
    },

    deleteUser: (req, res) =>{
        usersService.deleteUser(req, res);
    },

    processLogin : function(req, res){

        usersService.processLogin(req, res);
    },    

    registerView: function (req, res) {
        res.render('register');
    },

    adminForm: function(req, res){
        usersService.adminForm(req, res);
    },

    logOut: function(req, res){
        usersService.logOut(req, res);
    },

    allUsers: async function(req, res){
        usersService.viewAllUsers(req, res);
    }
};

module.exports = userController;