var express = require(`express`);
var router = express.Router();
const productsController= require (`../controllers/productsController`);
const path = require('path');
const db = require (path.join(__dirname,`..`,`database`,`models`));
const contactValidator = require ((path.join(__dirname,`..`,`middlewares`,`validators`,`contactValidator`)));
const contactController =  require(path.join(__dirname,`..`,`controllers`,`contactController`));
let authorization=require('../middlewares/validators/authorization');

// console.logs(arrayUsuarios);

//fin metodos producto

/* GET home page. */
router.get(`/`, productsController.root);



router.get('/nosotros', (req, res)=>{
    res.render('nosotros')
})
router.get('/equipo', (req, res)=>{
    res.render('equipo')
})

router.get('/cambios', (req, res)=>{
    res.render('cambios')
})

router.get('/faq', (req, res)=>{
    res.render('FAQ')
})

router.get('/promociones', (req, res)=>{
    res.render('promociones')
})

router.get("/contact", contactController.form);
router.post("/contact", contactValidator, contactController.send);
router.get("/admins/contact", authorization, contactController.messages);

module.exports = router;
