function passUserToViews(req, res, next) {
    if(req.session.userLogged){
        res.locals.user = req.session.userLogged;
    }else{
        res.locals.user = "";
    }
  
    next();
}

module.exports = passUserToViews;