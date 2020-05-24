var express = require('express');
var router = express.Router();

//metodos para cargar producto. mover a controladores después.

const fs = require('fs');
const path = require('path');
const multer=require('multer');


const objetosPath= path.join(__dirname, '..', 'data', 'productos2.json');

let productos = JSON.parse(fs.readFileSync(objetosPath, 'utf-8' ));



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





//fin metodos producto

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



//ruta para formulario de carga de productos

router.get ('/carga', (req, res)=> {
  res.render('carga')
})

router.post ('/carga', upload.any(), (req, res)=>{

let producto ={
  id: 0,
  nombre: null,
  marca: null,
  descripcion: null,
  imagen1: undefined,
  precio: null,
  descuento: null,
}

function isEmptyObject(objeto){
  return !Object.keys(objeto).length;
}

console.log(isEmptyObject(productos))

if (isEmptyObject(productos)){
  producto.id=1;
} else {
  
 producto.id=productos[productos.lenght-1].id+1;
  
}

producto.nombre=req.body.nombre;
producto.marca=req.body.marca;
producto.descripcion=req.body.descripcion;
producto.precio=req.body.precio;
producto.descuento=req.body.descuento;
// producto.imagen1=req.files[0].filename;

console.log(productos);

console.log(typeof(productos))

if (isEmptyObject(productos)){
  productos=producto;
} else {


}
 



fs.writeFileSync (objetosPath, JSON.stringify (productos));

})





module.exports = router;
