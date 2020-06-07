var express = require('express');
var router = express.Router();

const productsController= require ('../controllers/productsController');

// console.logs(arrayUsuarios);

//fin metodos producto

/* GET home page. */
router.get('/', productsController.root);






module.exports = router;
