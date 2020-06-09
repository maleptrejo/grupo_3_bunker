function guest (req, res, next) {
if (req.session.usuarioLogeado==undefined){
    next();
} else {
    res.render('vistaPerfil', {userShow:req.session.usuarioLogeado})
}
}

module.exports=guest;