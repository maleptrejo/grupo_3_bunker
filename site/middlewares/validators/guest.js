const db= require('../../database/models');

function guest (req, res, next) {
if (req.session.usuarioLogeado==undefined){

    next();
} else {
   
    db.Customer.findOne({
        where: {
            user_id: req.session.usuarioLogeado.id
        }
    }).then((resultado)=> {
        
        console.log(resultado.dataValues)

    if (resultado!=null) {
       let userView= {
           avatar: req.session.usuarioLogeado.avatar ,
           name: resultado.dataValues.name,
           surname: resultado.dataValues.surname ,
           adress: resultado.dataValues.adress,
           country: resultado.dataValues.country,
       } 
    res.render('vistaPerfil', {userShow:userView})       
     } else {   
        res.send ('No existe el usuario');
    //     res.send(resultado)
    //     // res.render('vistaPerfil', {userShow:[req.session.usuarioLogeado, resultado ]})
       }
    })


    //  res.render('vistaPerfil', {userShow:req.session.usuarioLogeado})

    
}
}

module.exports=guest;




