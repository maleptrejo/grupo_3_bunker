/************** REQUIRED MODULES **************/
var bcrypt = require('bcrypt');
var fs = require('fs');
const path = require('path');
var {check, validationResult, body} = require('express-validator');

const db= require('../database/models');
/*************** REQUIRED FILES ***************/


/****************** AUXILIAR ******************/
let user = {
         email: '',
   password: '',
 }



const usersFilePath= path.join(__dirname, '../data/usuarios.json');
let usuarios = JSON.parse(fs.readFileSync(usersFilePath, {encoding: 'utf-8'}));

function isEmptyObject(objeto){
    return !Object.keys(objeto).length;
};
/************** MODULE TO EXPORT **************/
const users = {
    vistaPerfil: (req, res, next) => {
        res.render('vistaPerfil');
    },
    formLogin: (req, res, next) => {
        if (req.session.usuarioLogeado !=undefined) {
            // console.log(req.session)
            res.redirect('/');
        }
        res.render('formLogin');
    },
    enter: (req, res)=>{
        
       db.Users.findOne({
             where: {
                 email: req.body.email
  
             }
         }).then((resultado)=> {


            if (resultado==null) {
                  //¡¡ojo! está mandando la vista de error desde acá, no desde el middleware guest
               res.render('errorLogin');
                // res.send ('No existe el usuario');
            } else { 
            
                if(bcrypt.compareSync(req.body.password, resultado.password)){
                
                    req.session.usuarioLogeado=resultado.dataValues;

                    // console.log(req.session.usuarioLogeado)
    
                   res.redirect('/')

            }
           
         //******** */
          //  } );
        //  if (usuarioEntrante) {
        //     if(bcrypt.compareSync(req.body.password, usuarioEntrante.password)){
                
        //         req.session.usuarioLogeado=usuarioEntrante;

        //        res.redirect('/')

        //  } else {
        //     res.send ('No existe el usuario');
        //  }

         //*********esto de arriba va */
         
    //      if (usuarioEntrante!=undefined) { 
    //         if(bcrypt.compareSync(req.body.password, usuarioEntrante.password)){
                
    //             req.session.usuarioLogeado=usuarioEntrante;

    //            res.redirect('/')


    //      }else {
    //          res.send ('La contraseña es incorrecta');
    //      }

    //     // } else {
    //     //     res.send ('No existe el usuario');
    //     // }
    // }


}
       
    })


    },
    check: (req, res) => {
        if (req.session.usuarioLogeado==undefined) {
            res.render ('redireccion')
        }else {
            res.send ('el usuario es' + req.session.usuarioLogeado.email)
        }
    },
    createUser: (req,res,next)=>{
        
        res.render('registro', {data: user, errors: []});
        
        
    },
    registro: (req, res, next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let passEncripted = bcrypt.hashSync(req.body.password, 10);

            db.Users.create({
                
                email: req.body.email,
                password: passEncripted,
                avatar: 'noAvatar.jpeg',
                Customer: {
                    name: req.body.name,
                    surname: req.body.sName,
                    country: req.body.country,
                    adress: req.body.adress
                },

            }, {
                include: {
                    model: db.Customer,
                    as: 'Customer',
                }
            })

            res.render('registro', {errors:undefined})
        }else{
            res.render('registro', {errors:errors.errors});
        };    
    },
    // avatar:(req, res) => {
    //     if (req.files.length == 0){
    //         usuarios[usuarios.length-1].avatar = 'noAvatar.jpeg';
    //     } else{
    //         usuarios[usuarios.length-1].avatar = req.files[0].filename;
    //     };
    //     fs.writeFileSync(usersFilePath, JSON.stringify(usuarios));
    //     res.render('vistaPerfil', {userShow:usuarios[usuarios.length-1]});
    // },
    close: (req, res) => {
        req.session.destroy();
       
        res.redirect('/users/login');
    },
    cartEnter: (req, res) => {

        res.render('cart');
    },
    avatar: (req, res) => {
        res.render('avatar');
    },
    cargarAvatar: (req, res) => {


        if(req.session.usuarioLogeado==undefined ) {
            res.render('errorSession')
        }

        db.Users.update({

            avatar: req.files[0].filename

            },
           {where: {
                email: req.session.usuarioLogeado.email
            }}
            
            ).then((resultado)=> { 
                
                res.render('vistaPerfil', {userShow:req.session.usuarioLogeado}); 
            })
        },
    editForm: (req, res) => {

      
        db.Customer.findOne({
            where: {
                user_id: req.session.usuarioLogeado.id
            }
        }).then((resultado)=> {

            let userData; 
        if (resultado!=null) {
           
            userData= {
               avatar: req.session.usuarioLogeado.avatar ,
               name: resultado.dataValues.name,
               surname: resultado.dataValues.surname ,
               adress: resultado.dataValues.adress,
               country: resultado.dataValues.country,
               email: req.session.usuarioLogeado.email
           } 
             
         } 

        res.render('editUserForm', {userData: userData});
    
        })            
},
    editData: (req, res) => {

        // esto no anda. Hcaer que cambie el pass por otro lado. 
        if(req.session.usuarioLogeado==undefined ) {
            res.render ('redireccion')
        }
        db.Users.update({
            email: req.body.email,
            },
           {where: {
                email: req.session.usuarioLogeado.email
            }}).then((user)=> { 
                let customer = user.getCustomer()
                customer.update({
                name: req.body.name,
                surname: req.body.sName,
                country: req.body.country,
                adress: req.body.adress
            })
                let objeto= resultado;
                console.log(resultado);
                res.render('vistaPerfil', {userShow:req.session.usuarioLogeado}); 
            })
       

     

            

       



        //**********lo de abajo va con json */

        // let userEdit = usuarios.find(usuario=> {
        //     return usuario.email==req.session.usuarioLogeado.email;
        //  });

        //  userEdit.name=req.body.name;
        //  userEdit.sName=req.body.sName;
        //  userEdit.Email=req.body.email;

        //  let index = usuarios.findIndex(usuario => usuario.email === req.session.usuarioLogeado.email);
     
        //  usuarios [index] = userEdit;

        //  fs.writeFileSync(usersFilePath, JSON.stringify(usuarios));

        //  res.render('vistaPerfil', {userShow:userEdit}); 

    // }

    

/////////////////
    }
};

/************** EXPORTED MODULE **************/
module.exports = users;