var express = require(`express`);
var router = express.Router();
const path = require('path');
const productsController= require (path.join(__dirname,`..`,`controllers`,`productsController`));
const db = require (path.join(__dirname,`..`,`database`,`models`));
const contactValidator = require ((path.join(__dirname,`..`,`middlewares`,`validators`,`contactValidator`)));
const contactController =  require(path.join(__dirname,`..`,`controllers`,`contactController`));

// console.logs(arrayUsuarios);

//fin metodos producto

/* GET home page. */

router.get(`/`, productsController.root);

router.get("/contact", contactController.form);
router.post("/contact", contactValidator, contactController.send);



module.exports = router;
