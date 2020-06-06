/************** REQUIRED MODULES **************/
const express = require('express');
const router = express.Router();
const path = require('path');

/************ REQUIRED CONTROLLER ************/
const usersController = require(path.join(__dirname,'../controllers/usersController'));

/****************** ROUTES ******************/
router.get('/perfil', usersController.vistaPerfil);
router.get('/login', usersController.formLogin);
router.post('/login/val', usersController.login);

/************** EXPORTED MODULE **************/
module.exports = router;
