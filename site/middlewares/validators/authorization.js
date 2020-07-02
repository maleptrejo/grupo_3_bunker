const db= require('../../database/models');

function authorization (req,res,next) {
    if (req.session.usuarioLogeado==undefined){

        res.render('redireccion');
    } else {

        db.Admins.findOne({
            where:{
             user_id: req.session.usuarioLogeado.id
            }
        })
        .then((resultado)=> { 
            if(resultado!=null) { 
                next();
            }else{
                res.render('adminsOnly');
            }
        })
    }
};
module.exports=authorization;



