/************** REQUIRED MODULES **************/
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

/*************** MULTER CONFIG ***************/
var storage= multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'public/images/productos/')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+path.extname(file.originalname));
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
//function isEmptyObject(objeto){
//  return !Object.keys(objeto).length;
//}

/************ REQUIRED CONTROLLER ************/
const productsController = require(path.join(__dirname,'../controllers/productsController'));

/****************** ROUTES ******************/
router.get('/', productsController.list);
router.get ('/create', productsController.createForm);
router.post('/carga', upload.any(), productsController.create);

router.get('/:id', productsController.detail);

router.get('/:productId/edit', productsController.editForm); 
 router.put ('/edit/:productId',  upload.any(), productsController.edit);
router.delete('/edit/:productId', productsController.delete);

/************** EXPORTED MODULE **************/
module.exports = router;