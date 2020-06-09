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
        res.render('formLogin');
    },
    login: (req, res, next) => {
        
        res.send(req.body);
    },
    createUser: (req,res,next)=>{
        
        res.render('registro', {data: user, errors: []});
        
        
    },
    registro: (req, res, next) => {
        let errors = validationResult(req);
        console.log(errors);
        console.log(req.body.name);
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
            console.log(newUser.id);
            newUser.name = req.body.name;
            newUser.sName = req.body.sName;
            newUser.email = req.body.email;
            newUser.password = passEncripted;
            // if (req.files == undefined){
            //     newUser.avatar = "index.png";
            // } else {
            //     newUser.avatar = req.files[0].filename;
            // };
            usuarios.push(newUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(usuarios));
            res.render('vistaPerfil', {userShow:newUser});  
        }else{
            return res.render('registro', {errors:errors.errors});
        }
        
    },
    
}

/************** EXPORTED MODULE **************/
module.exports = users;