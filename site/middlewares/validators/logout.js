function logout (req, res, next) {
    if (req.session.usuarioLogeado==undefined){
        res.redirect(`/`)
    } else {
        next();
    }
    }
    
    module.exports=logout;