const userController = {
    viewProfile : function (req, res) {
        res.render("userProfile");
    },
    saveUser: function (req,res) {
        console.log(req.body)
        res.send(req.body)
    },
    registerView: function (req,res) {
        res.render('register');
    },
};

module.exports = userController;