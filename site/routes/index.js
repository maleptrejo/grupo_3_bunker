var express = require('express');
var router = express.Router();

//metodos para cargar producto. mover a controladores después.

const fs = require('fs');
const path = require('path');
const multer=require('multer');

const usersFilePath= path.join(__dirname, '../data/usuarios.json');
const usersObjeto = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const prod2FilePath= path.join(__dirname, '../data/productos2.json');
const prod2Objeto = JSON.parse(fs.readFileSync(prod2FilePath, 'utf-8'));

const prodFilePath= path.join(__dirname, '../data/productos2.json');
const prodObjeto = JSON.parse(fs.readFileSync(prodFilePath, 'utf-8'));



prodObjeto.pu

// console.log(usersObjeto[1]);

let arrayUsuarios=[];
arrayUsuarios.push(usersObjeto[1]);
arrayUsuarios.push(usersObjeto[2]);

// console.log(arrayUsuarios);







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

  if (isEmptyObject(prod2Objeto)){



    producto.id=1;
  } else {
    producto.id=prod2Objeto[prod2Objeto.length-1].id+1;
  }

  if (req.files == undefined) {
    producto.imagen1 = 'n/a';
   } else {
    producto.imagen1 = req.files[0].filename;
   }


  producto.nombre=req.body.nombre;
  producto.marca=req.body.marca;
  producto.descripcion=req.body.descripcion;
  producto.precio=req.body.precio;
  producto.descuento=req.body.descuento;
  
  prod2Objeto.push(producto)

  fs.writeFileSync(prod2FilePath, JSON.stringify(prod2Objeto));


res.send ('vuelve por post')

})





module.exports = router;
