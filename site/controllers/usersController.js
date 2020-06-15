/************** REQUIRED MODULES **************/
var bcrypt = require('bcrypt');
var fs = require('fs');
const path = require('path');
var {check, validationResult, body} = require('express-validator')
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
            console.log(req.session)
            res.redirect('/');
        }
        res.render('formLogin');
    },


    enter: (req, res)=>{
        
        let usuarioEntrante= usuarios.find(usuario=> {
           
            return req.body.email==usuario.email;
         });
         console.log(usuarioEntrante!=undefined)

         if (usuarioEntrante!=undefined) { 
            if(bcrypt.compareSync(req.body.password, usuarioEntrante.password)){
                
                req.session.usuarioLogeado=usuarioEntrante;

               res.redirect('/')


         }else {
             res.send ('La contraseña es incorrecta');
         }

        } else {
            res.send ('No existe el usuario');
        }
    },

    check: (req, res) => {
        if (req.session.usuarioLogeado==undefined) {
            res.render ('redireccion')
        }else {
            res.send ('el usuario es' + req.session.usuarioLogeado.name)
        }
    },
   
    createUser: (req,res,next)=>{
        
        res.render('registro', {data: user, errors: []});
        
        
    },
    registro: (req, res, next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let passEncripted = bcrypt.hashSync(req.body.password, 10);
            let newUser ={
                id: 0,
                name: null,
                sName: null,
                email: null,
                password: null,
                avatar: null
            };
            if (isEmptyObject(usuarios)){
                newUser.id=1;
            } else {
                newUser.id=usuarios[usuarios.length-1].id+1;
            };
            newUser.name = req.body.name;
            newUser.sName = req.body.sName;
            newUser.email = req.body.email;
            newUser.password = passEncripted;
            newUser.avatar = 'noAvatar.jpeg';

           
            // if (req.files == undefined){
            //     newUser.avatar = "index.png";
            // } else {
            //     newUser.avatar = req.files[0].filename;
            // };
            usuarios.push(newUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(usuarios));
            res.render('registro', {errors:undefined})
        }else{
            res.render('registro', {errors:errors.errors});
        };    
    },
    avatar:(req, res) => {
        if (req.files.length == 0){
            usuarios[usuarios.length-1].avatar = 'noAvatar.jpeg';
        } else{
            usuarios[usuarios.length-1].avatar = req.files[0].filename;
        };
        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios));
        res.render('vistaPerfil', {userShow:usuarios[usuarios.length-1]});
    },
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
            res.send ('no hay session')
        }

        

        let userAvatar= usuarios.find(usuario=> {
          
            return usuario.email==req.session.usuarioLogeado.email;
         });

         console.log(userAvatar);

         userAvatar.avatar= req.files[0].filename;
         
         let index = usuarios.findIndex(usuario => usuario.email === req.session.usuarioLogeado.email);
     
         usuarios [index] = userAvatar;

         fs.writeFileSync(usersFilePath, JSON.stringify(usuarios));

        //  res.redirect('/')

        

        res.render('vistaPerfil', {userShow:userAvatar});  


    },
    editForm: (req, res) => {
        res.render('editUserForm', {userData: req.session.usuarioLogeado});
    },
    editData: (req, res) => {

        if(req.session.usuarioLogeado==undefined ) {
            res.send ('no hay session')
        }

        let userEdit = usuarios.find(usuario=> {
            return usuario.email==req.session.usuarioLogeado.email;
         });

         userEdit.name=req.body.name;
         userEdit.sName=req.body.sName;
         userEdit.Email=req.body.email;

         



         let index = usuarios.findIndex(usuario => usuario.email === req.session.usuarioLogeado.email);
     
         usuarios [index] = userEdit;

         fs.writeFileSync(usersFilePath, JSON.stringify(usuarios));

         res.render('vistaPerfil', {userShow:userEdit}); 

    }

    

/////////////////
}

/************** EXPORTED MODULE **************/
module.exports = users;