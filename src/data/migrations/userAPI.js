const db = require('../models');
const Op = db.Sequelize.Op;
const usersService = require('../usersService');

module.exports = {
    list: function(req, res){
        db.User.findAll()
        .then(function(users){
            return res.status(200).json({
                total: users.length,
                data: users,
                status: 200
            })
        })
    },

    find: function(req, res){
        db.User.findByPk(req.params.id)
        .then(function(user){
            return res.status(200).json({
                data: user,
                status: 200
            })
        })
    },

    save: function(req, res){
        db.User.create(req.body)
        .then(function(user){
            return res.status(200).json({
                data: user,
                status: 200
            })
        })
    },

    delete: function(req, res){
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(response){
            return res.json(response);
        })
    },

    search: function(req, res){
        db.User.findAll({
            title: {[Op.like]: '%' + req.query.keyword + '%'}
        })
        .then(function(users){
            if(users.length > 0){
                return res.status(200).json(users);
            } else {
                return res.status(200).json("No se encontraron usuarios");
            }
        })
    }
}