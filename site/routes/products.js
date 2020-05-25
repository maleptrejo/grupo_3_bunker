<<<<<<< HEAD
var express = require('express');
 var router = express.Router();

 /* products */
 router.get('/', function(req, res, next) {

res.send ('productos');
 });

 module.exports = router;
=======
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
>>>>>>> 9d8ec56433c69c3f0b96d78a92e96ddd1dafb4c1
