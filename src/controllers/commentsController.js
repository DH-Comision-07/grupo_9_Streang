let db = require('../data/models');
let productsService = require('../data/productsService');

const controller = {

    sendComment: async function(req, res){
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        db.Comments.create({
            comment: req.body.comment,
            product_id: req.body.product_id,
            user: req.session.userLogged.user_name,
            avatar: req.session.userLogged.avatar,
            date: date
        })

        res.redirect(`/products/detail/${req.body.product_id}`);
    }
};

module.exports = controller