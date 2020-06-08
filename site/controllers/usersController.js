/************** REQUIRED MODULES **************/
var bcrypt = require('bcrypt');
var fs = require('fs');
const path = require('path');

var { validationResult } = require('express-validator');
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
        res.render('formLogin');
    },
    login: (req, res, next) => {
        
        res.send(req.body);
    },
    createUser: (req,res,next)=>{
       
        res.render('registro', {data: user, errors: []});
        
       
    },

    registro: (req, res, next) => {
    
        
        let errors = validationResult(req)
        console.log(errors);
        if (errors.isEmpty()) {
     
                let passEncripted = bcrypt.hashSync(req.body.password, 10);
    
                let newUser ={
                    id: 0,
                    email: null,
                    name: null,
                    sName: null,
                    password: null,
                    avatar: undefined,
                };
    
                //cargas id
                if (isEmptyObject(usuarios)){
                    newUser.id=1;
                } else {
                    newUser.id=usuarios[usuarios.length-1].id+1;
                };
    
            
                //cargas avatar
                if (isEmptyObject(req.files)){
                    newUser.avatar = 'noAvatar.jpeg';
                } else {
                    newUser.avatar = req.files[0].filename;
                };
    
                newUser.name = req.body.name;
                newUser.sName = req.body.sName;
                newUser.password = passEncripted;
                newUser.email= req.body.email;
    
               
    
                usuarios.push(newUser);
                fs.writeFileSync(usersFilePath, JSON.stringify(usuarios));
               
    
                let userShow=newUser;
                res.render('vistaPerfil', {userShow:userShow});

            }else {
                res.render('registro', {
                    data : {...user, ...req.body},
                    errors: errors.array()
                  })
            }

    },

/////////////////
}
/************** EXPORTED MODULE **************/
module.exports = users;