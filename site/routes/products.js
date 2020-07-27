/************** REQUIRED MODULES **************/
const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const multer = require(`multer`);
const createProducts = require ((path.join(__dirname,`..`,`middlewares`,`validators`,`createProducts`)));
let authorization=require(`../middlewares/validators/authorization`);

/*************** MULTER CONFIG ***************/
var storage= multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,`public/images/productos/`)
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+path.extname(file.originalname));
  }
})
var upload = multer({ storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc|docx|jpg)$/)) {
      return cb(new Error(`Error en el tipo de archivo.`));
    }
    cb(null, true);
  }
});
//function isEmptyObject(objeto){
//  return !Object.keys(objeto).length;
//}

/************ REQUIRED CONTROLLER ************/
const productsController = require(path.join(__dirname,`../controllers/productsController`));

/****************** ROUTES ******************/
router.get(`/`, productsController.list);
router.get (`/create`, productsController.createForm);
router.post(`/carga`, createProducts, upload.any(), productsController.create);
router.get(`/search`, productsController.search);
router.get(`/extras`, productsController.brandsCategoriesDiscounts);
router.post(`/extras/update`, productsController.extrasUpdate)

//a partir de acá, toma el segundo valor post /products/ como relativo
router.get(`/:id`, productsController.detail);
router.get(`/:productId/edit`, authorization, productsController.editForm); 
router.put(`/:productId/edit`,  upload.any(), productsController.edit);
router.delete(`/:productId`, productsController.delete);




/************** EXPORTED MODULE **************/
module.exports = router;