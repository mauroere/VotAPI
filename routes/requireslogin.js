var requiresLogin = function(req, res, next) {
    //console.log("Requiere autenticación para acceder a la web solicitada");
    if (req.session.adminId) {
        return next();
    } else {
        var err = new Error("Requiere autenticación para acceder a la web solicitada");
        err.status = 401;
        return next(err);
        //res.redirect('/login');
    }
}

module.exports = requiresLogin;