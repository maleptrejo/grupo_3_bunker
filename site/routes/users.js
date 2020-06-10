/************** REQUIRED MODULES **************/
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
var {check, validationResult, body} = require('express-validator');
let errorsRegister=require('../middlewares/validators/errorsRegister');


let guest=require('../middlewares/validators/guest');
let authorization=require('../middlewares/validators/authorization');
let cartAccess =require('../middlewares/validators/cartAccess');
let logout=require('../middlewares/validators/logout');

/************ MULTER CONFIG **************/
var storage= multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'public/images/usuarios/')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+path.extname(file.originalname));
  }
})
var upload = multer({ storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc|docx|jpg|jpeg)$/)) {
      return cb(new Error('Error en el tipo de archivo.'));
    }
    cb(null, true);
  }
});

/************ REQUIRED CONTROLLER ************/
const usersController = require(path.join(__dirname,'../controllers/usersController'));

/****************** ROUTES ******************/
router.get('/perfil', usersController.vistaPerfil);
router.get('/login',guest, usersController.formLogin);
router.post('/login/val', usersController.enter);
router.get('/check', usersController.check);
router.get ('/create', usersController.createUser);
router.post('/create', [
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
], upload.any(), usersController.registro);
router.get('/cart', cartAccess, usersController.cartEnter);
router.get('/logout',logout, usersController.close);
router.get('/avatar',cartAccess, usersController.avatar);
router.post('/avatar', upload.any(), usersController.cargarAvatar);

/************** EXPORTED MODULE **************/
module.exports = router;
