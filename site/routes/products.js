/************** REQUIRED MODULES **************/
var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');
const multer = require('multer');

const usersFilePath= path.join(__dirname, '../data/usuarios.json');
const usersObjeto = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const prod2FilePath= path.join(__dirname, '../data/productos2.json');
var prod2Objeto = JSON.parse(fs.readFileSync(prod2FilePath, 'utf-8'));

var prod2Objeto = JSON.parse(fs.readFileSync(prod2FilePath, 'utf-8'));

var storage= multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,'public/images/productos/')
        },
     filename:function(req,file,cb){
     cb(null,Date.now()+path.extname(file.originalname)); //Appending extension
      }
     })
    
    var upload = multer({ storage: storage,
      fileFilter: function (req, file, cb) {
      if (!file.originalname.match(/\.(pdf|doc|docx|jpg)$/)) {
     return cb(new Error('Error en el tipo de archivo.'));
      }
      cb(null, true);
     }
      });
    
    
      function isEmptyObject(objeto){
        return !Object.keys(objeto).length;
      }

/************ REQUIRED CONTROLLER ************/
var productsController = require(path.join(__dirname,'../controllers/productsController'));


/****************** ROUTES ******************/
router.get('/', productsController.list);

router.get ('/create', productsController.createForm);
router.post('/carga', upload.any(), productsController.create);

router.get('/:id', productsController.detail);

router.get('/:productId/edit', productsController.edit);  
router.put ('/edit/:productId',  upload.any(), productsController.edit);

router.get ('/create', productsController.createForm);
router.post('/carga', upload.any(), productsController.create);

router.delete('/edit/:productId', productsController.delete);
  
   


module.exports = router;
