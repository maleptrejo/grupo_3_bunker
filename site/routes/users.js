/************** REQUIRED MODULES **************/
const express = require(`express`);
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
var {check, validationResult, body} = require('express-validator');
const db= require('../database/models');

let guest=require('../middlewares/validators/guest');
let guestFav=require('../middlewares/validators/guestFav');
let authorization=require('../middlewares/validators/authorization');
let cartAccess =require('../middlewares/validators/cartAccess');
let logout=require('../middlewares/validators/logout');
let checkUser=require('../middlewares/validators/checkUser');
const createUserValidator = require(path.join(__dirname,`..`,`middlewares`,`validators`,`createUserValidator`));


/************ MULTER CONFIG **************/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,`..`,`public`,`images`,`usuarios`))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + `-` + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

/************ REQUIRED CONTROLLER ************/
const usersController = require(path.join(__dirname,`../controllers/usersController`));

/****************** ROUTES ******************/
// router.get('/perfil',cartAccess, usersController.vistaPerfil);
router.get('/login',guest, usersController.formLogin);
router.get('/favoritos',guestFav, usersController.verFavs);
router.get('/cart',cartAccess, usersController.verCart);
router.post('/login/val', usersController.enter);
router.get('/check', usersController.check);
router.get ('/create', usersController.createUser);
router.post('/create',  createUserValidator, usersController.registro);
// router.post(`/avatar`, upload.any(), usersController.avatar);
// router.get(`/cart`, cartAccess, usersController.cartEnter);
router.get(`/check_out`, cartAccess, usersController.proceedCheckOut);
router.get(`/logout`,logout, usersController.close);
router.get(`/avatar`,cartAccess, usersController.avatar);
router.post(`/avatar`,cartAccess, upload.any(), usersController.cargarAvatar);
router.get('/edit',cartAccess, usersController.editForm);
router.post('/edit',cartAccess, createUserValidator, usersController.editData);
router.get('/delete',cartAccess, usersController.deleteForm);
router.get('/delete/ok',cartAccess, usersController.deleteOk);
router.get('/admins/edit', authorization, usersController.editFormAdmin);
router.get('/admins/create_admin', authorization, usersController.create_admin);
router.post('/admins/create_admin',createUserValidator, authorization, usersController.create_admin_post);
router.post('/admins/edit',authorization, usersController.editAdminData);
router.get('/admins/avatar', authorization, usersController.avatar)
router.post('/admins/avatar',authorization, usersController.cargarAvatar);
router.get('/admins/control',authorization, usersController.controlVer);

router.get('/admins/contacts', authorization, usersController.controlContacts);
// router.get('/admins/contacts',authorization, usersController.controlContacts);
router.get('/admins/delete', authorization, usersController.deleteFormAdmin);
router.get('/admins/delete/ok', authorization, usersController.deleteOkAdmin);

router.get('/favs', usersController.favsShow);

/************** EXPORTED MODULE **************/
module.exports = router;


