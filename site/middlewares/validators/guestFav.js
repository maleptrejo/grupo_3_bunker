const db= require(`../../database/models`);

function guestFav (req, res, next) {
if (req.session.usuarioLogeado==undefined){
    res.render('errorLogin')
    
} else {

    next();
}
}

module.exports=guestFav;









