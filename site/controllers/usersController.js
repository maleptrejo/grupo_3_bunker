/************** REQUIRED MODULES **************/
var bcrypt = require('bcrypt');
var fs = require('fs');
const path = require('path');

/*************** REQUIRED FILES ***************/


/****************** AUXILIAR ******************/
const usersFilePath= path.join(__dirname, '../data/usuarios.json');
let usuarios = JSON.parse(fs.readFileSync(usersFilePath, {encoding: 'utf-8'}));
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
        if(req.body.password == req.body.cpassword){
            let passEncripted = bcrypt.hashSync(req.body.password, 10);
            let newUser ={
                name: null,
                sName: null,
                email: null,
                password: null,
                avatar: null
            };
            newUser.name = req.body.name;
            newUser.sName = req.body.sName;
            newUser.email = req.body.email;
            newUser.password = passEncripted;
            if (req.files == undefined){
                newUser.avatar = "index.png";
            } else {
                newUser.avatar = req.files[0].filename;
            };
            usuarios.push(newUser);
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