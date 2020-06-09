function cartAccess (req, res, next) {
    if (req.session.usuarioLogeado==undefined){
       res.render('redireccion')
    } else {
        next();
    }
    }
    
    module.exports=cartAccess;