var express = require('express');
 var router = express.Router();

 /* products */
 router.get('/', function(req, res, next) {

res.send ('productos');
 });

 module.exports = router;