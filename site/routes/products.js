/************** REQUIRED MODULES **************/
var express = require('express');
var router = express.Router();
var path = require('path');

/************ REQUIRED CONTROLLER ************/
var productsController = require(path.join(__dirname,'..','controllers','productsController'));

/****************** ROUTES ******************/
router.get('/', productsController.list);
router.get('/:id', productsController.detail);
router.get('/:id/edit', productsController.edit);
router.post('/create', productsController.create);

module.exports = router;