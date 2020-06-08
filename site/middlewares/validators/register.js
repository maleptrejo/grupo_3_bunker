var { check } = require('express-validator')

module.exports = [
    check('email').isEmail().withMessage('El email no es valido'),
    check('password').isLength({min: 6, max: 9}).withMessage('El password debe contener entre 6 y 9 caracteres'),
]