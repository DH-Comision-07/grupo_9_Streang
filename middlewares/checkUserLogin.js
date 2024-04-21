function checkUserLogin(req, res, next) {
    let user = "";
    if(req.session.userLogged){
        user = req.session.userLogged
    }
    next();
}

module.exports = checkUserLogin;
