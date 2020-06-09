function authorization (req,res,next) {

    if(req.session.usuarioLogeado.email != 'admin@admin.com') {
        res.send('esta página es sólo para administradores')
    } else {
        next();
    }
};


module.exports=authorization;