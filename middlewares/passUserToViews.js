function passUserToViews(req, res, next) {
    res.locals.user = req.session.userLogged;
    next();
}

module.exports = passUserToViews;