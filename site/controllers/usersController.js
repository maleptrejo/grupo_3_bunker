/************** REQUIRED MODULES **************/
var bcrypt = require('bcrypt');
var fs = require('fs');
const path = require('path');

/*************** REQUIRED FILES ***************/


/****************** AUXILIAR ******************/
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
        res.render('formLogin');
    },
    login: (req, res, next) => {
        
        res.send(req.body);
    },
    createUser: (req,res,next)=>{
        res.render('registro');
    },
    registro: (req, res, next) => {
        //let mailCheck = undefined;
       // mailCheck = usuarios.find(userJeison => //usuarios.email);
       // console.log(mailCheck);
      //  if (mailCheck != undefined){
       //     res.send ("El usuario ya se //encuentra registrado");
      //  }

        if(req.body.password == req.body.cpassword){
            let passEncripted = bcrypt.hashSync(req.body.password, 10);
            let newUser ={
                id: 0,
                name: null,
                sName: null,
                email: null,
                password: null,
                avatar: undefined,
            };

            if (isEmptyObject(usuarios)){
                newUser.id=1;
            } else {
                newUser.id=usuarios[usuarios.length-1].id+1;
            };

            console.log(req.files)
            if (req.files == undefined){
                newUser.avatar = "noAvatar.jpeg";
            } else {
                newUser.avatar = req.files[0].filename;
            };

        
            newUser.name = req.body.name;
            newUser.sName = req.body.sName;
            
            if(req.body.email != req.body.cemail){
                res.send("Los campos de email deben ser iguales")
                 } else {
                 newUser.email = req.body.email;
              }

            newUser.password = passEncripted;
            
            ususarios.push(newUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(usuarios));
            res.send (newUser);
           // res.redirect('/vistaPerfil');
            
        }else{
            res.send('LAS CONTRASEÑAS NO COINCIDEN!');
        }
    }
};

/************** EXPORTED MODULE **************/
module.exports = users;