/************** REQUIRED MODULES **************/

var fs = require(`fs`);
const path = require(`path`);
var {check, body} = require(`express-validator`);



module.exports=[
    
    check(`email2`).equals(`email2`).withMessage(`Los email no coinciden`),
    body(`email`).custom(function (value) {
        const usersFilePath= path.join(__dirname, `../../data/usuarios.json`);
         let usuarios = JSON.parse(fs.readFileSync(usersFilePath, {encoding: `utf-8`}));
        usuarios.forEach(usuario=> {
         if (usuario.email==value) {
                 return false
           }else {
                 return true
              }
         })
      }).withMessage(`El mail ya se encuentra registrado`),
    check(`password`).isLength({min: 6, max: 9}).withMessage(`El password debe contener entre 6 y 9 caracteres`),
    check(`cpassword`).equals(`password`).withMessage(`Las contraseñas no coinciden`),
    
]
