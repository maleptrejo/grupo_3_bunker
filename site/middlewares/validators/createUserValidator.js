/************** REQUIRED MODULES **************/
const path = require(`path`);
const db = require(path.join(__dirname,`..`,`..`,`database`,`models`));
const { check, validationResult, body } = require('express-validator');


var validator = [
    
        check('name').isLength({min:1}).withMessage('El campo nombre debe contener al menos un caracter'),
        check('sName').isLength({min:1}).withMessage('El campo apellido debe contener al menos un caracter'),
        check('email').isEmail().withMessage('El formato del email no es válido'),
        check('password').isLength({min:8, max:12}).withMessage('La contraseña debe contener entre 8 y 12 caracteres'),
      body('cPassword').custom(function(cpassword,{req}){
           if (cpassword == req.body.password){
            return true;
          }else {
             return false;
           }
       }).withMessage('Las contraseñas no coinciden'),
        body('email').custom(function(valor, {req}){
      
       return db.Users.findOne({
          where: {
              email: req.body.email
          }
      }).then((resultado)=> {
      
        if (resultado) {
          return Promise.reject();
        }
        })
        }).withMessage('Este email ya esta registrado')
      
      
]

module.exports = validator;