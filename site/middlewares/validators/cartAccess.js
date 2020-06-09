function cartAccess (req, res, next) {
    if (req.session.usuarioLogeado==undefined){
        res.send ('Necesitás estar logueado para continuar')
    } else {
        next();
    }
    }
    
    module.exports=cartAccess;