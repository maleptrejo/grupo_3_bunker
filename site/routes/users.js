/************** REQUIRED MODULES **************/
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
var {check, validationResult, body} = require('express-validator');
const db= require('../database/models');


let errorsRegister=require('../middlewares/validators/errorsRegister');
let guest=require('../middlewares/validators/guest');
let authorization=require('../middlewares/validators/authorization');
let cartAccess =require('../middlewares/validators/cartAccess');
let logout=require('../middlewares/validators/logout');
let checkUser=require('../middlewares/validators/checkUser');


/************ MULTER CONFIG **************/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..','public','images','usuarios'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

/************ REQUIRED CONTROLLER ************/
const usersController = require(path.join(__dirname,'../controllers/usersController'));

/****************** ROUTES ******************/
router.get('/perfil', usersController.vistaPerfil);
router.get('/login',guest, usersController.formLogin);
router.post('/login/val', usersController.enter);
router.get('/check', usersController.check);
router.get ('/create', usersController.createUser);
router.post('/create', checkUser, [
  check('name').isLength({min:1}).withMessage('El campo nombre debe contener al menos un caracter'),
  check('sName').isLength({min:1}).withMessage('El campo apellido debe contener al menos un caracter'),
  check('email').isEmail().withMessage('El formato del email no es válido'),
  check('password').isLength({min:8, max:12}).withMessage('La contraseña debe contener entre 8 y 12 caracteres'),
//   body('cPassword').custom(function(cpassword,{req}){
//     if (cpassword == req.body.password){
//       return true;
//     }else {
//       return false;
//     }
//   }).withMessage('Las contraseñas no coinciden'),
//   body('email').custom(function(valor, {req}){

//  db.Users.findOne({
//     where: {
//         email: req.body.email
//     }
// }).then((resultado)=> {
//   console.log(resultado)
//   if (resultado==null) {
//     return true;
//   }else{
//     return false;
//   }
//   })
//   }).withMessage('Este email ya esta registrado')

], usersController.registro);
// router.post('/avatar', upload.any(), usersController.avatar);
router.get('/cart', cartAccess, usersController.cartEnter);
router.get('/logout',logout, usersController.close);
router.get('/avatar',cartAccess, usersController.avatar);
router.post('/avatar', upload.any(), usersController.cargarAvatar);

router.get('/edit', usersController.editForm);
router.post('/edit', [
  //acá tmb reemplazar lógica por sequelize
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
    let usersFilePath= path.join(__dirname, '../data/usuarios.json');
    let usuarios = JSON.parse(fs.readFileSync(usersFilePath, {encoding: 'utf-8'}));
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email == valor) {
        return false;
      };
    };
    return true;
  }).withMessage('Este email ya esta registrado')
], usersController.editData);


router.get('/delete', usersController.deleteForm);
router.get('/delete/ok', usersController.deleteOk);

router.get('/admins/edit', authorization, usersController.editFormAdmin);
router.post('/admins/edit', usersController.editAdminData);
router.get('/admins/avatar', authorization, usersController.avatar)
router.post('/admins/avatar', usersController.cargarAvatar);
router.get('/admins/control',authorization, usersController.controlVer);
router.get('/admins/delete', authorization, usersController.deleteFormAdmin);
router.get('/admins/delete/ok', authorization, usersController.deleteOkAdmin);


/************** EXPORTED MODULE **************/
module.exports = router;





// [
//   check('name').isLength({min:1}).withMessage('El campo nombre debe contener al menos un caracter'),
//   check('sName').isLength({min:1}).withMessage('El campo apellido debe contener al menos un caracter'),
//   check('email').isEmail().withMessage('El formato del email no es válido'),
//   check('password').isLength({min:8, max:12}).withMessage('La contraseña debe contener entre 8 y 12 caracteres'),
//   body('cPassword').custom(function(cpassword,{req}){
//     if (cpassword == req.body.password){
//       return true;
//     }else {
//       return false;
//     }
//   }).withMessage('Las contraseñas no coinciden'),
//   body('email').custom(function(valor, {req}){

//     //reeemplazar esta lógica por findOne de sequelize
//     let usersFilePath= path.join(__dirname, '../data/usuarios.json');
//     let usuarios = JSON.parse(fs.readFileSync(usersFilePath, {encoding: 'utf-8'}));
//     for (let i = 0; i < usuarios.length; i++) {

//       //si encuentra, que retorne false
//       if (usuarios[i].email == valor) {
//       return false;
//       };
//     };
//     return true;
//   }).withMessage('Este email ya esta registrado')
// ]