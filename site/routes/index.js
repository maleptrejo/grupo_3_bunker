var express = require(`express`);
var router = express.Router();
const productsController= require (`../controllers/productsController`);

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


module.exports = router;
