const db= require(`../../database/models`);

function guest (req, res, next) {
if (req.session.usuarioLogeado==undefined){

    next();
} else {

    let userLogueado= req.session.usuarioLogeado;
   
    db.Customer.findOne({
        where: {
            user_id: req.session.usuarioLogeado.id
        }
    }).then((resultado)=> {
   
    if (resultado!=null) {

        let userView= {
            email: req.session.usuarioLogeado.email,
            avatar: req.session.usuarioLogeado.avatar ,
            name: resultado.dataValues.name,
            surname: resultado.dataValues.surname ,
            adress: resultado.dataValues.adress,
            country: resultado.dataValues.country,
        } 

        if(req.session.usuarioLogeado.email!= `admin@admin.com`) {
            
         res.render(`vistaPerfil`, {userShow:userView})       
          }  else {

            res.render(`vistaPerfilAdmin`, {userShow:userView})
        }

        }
       

       }).catch(function(){
           res.render(`errorLogin`)
       })

       
    

    //  res.render(`vistaPerfil`, {userShow:req.session.usuarioLogeado})

      //     res.send(resultado)
    //     // res.render(`vistaPerfil`, {userShow:[req.session.usuarioLogeado, resultado ]})
}
}

module.exports=guest;




