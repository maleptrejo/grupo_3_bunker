var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('vistaPerfil');
});

router.get('/login', function(req, res, next) {
  res.render('formLogin');
});

module.exports = router;
