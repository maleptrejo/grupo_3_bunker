function authorization (req,res,next) {
    next()
    // if (req.session.usuarioLogeado!=undefined) {
    //     if(req.session.usuarioLogeado.email == `admin@admin.com`) {
       
   
    //         next();
    //     }else {
    //      res.render(`noAdmin`)
    //     }
    // } else {
    //     res.redirect(`/`)
    // }

    
};


module.exports=authorization;