const path = require(`path`);
const db = require(path.join(__dirname,`..`,`..`,`database`,`models`));
const { check, validationResult} = require('express-validator');

const validator = [       
        
    check('name').isLength({min:3}).withMessage('El campo nombre debe contener al menos un caracter'),
    check('sName').isLength({min:3}).withMessage('El campo apellido debe contener al menos un caracter'),
    check('email').isEmail().withMessage('El formato del email no es válido'),
    check('message').isLength({min:10}).withMessage('El campo de mensaje debe contener al menos 10 caracteres')

]    



module.exports = validator;