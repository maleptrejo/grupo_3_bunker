var express = require('express');
var router = express.Router();

//metodos para cargar producto. mover a controladores después.

const fs = require('fs');
const path = require('path');
const multer=require('multer');


const usersFilePath= path.join(__dirname, '../data/usuarios.json');
const usersObjeto = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const prod2FilePath= path.join(__dirname, '../data/productos2.json');
var prod2Objeto = JSON.parse(fs.readFileSync(prod2FilePath, 'utf-8'));

// const prodFilePath= path.join(__dirname, '../data/productos2.json');
// const prodObjeto = JSON.parse(fs.readFileSync(prodFilePath, 'utf-8'));





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



//ruta y controlador de edicion de producto

router.get('/edit/:productId', function(req, res){



  let productId = req.params.productId;

  let productToEdit=prod2Objeto.find(producto=> producto.id==productId);

  console.log(productToEdit)

  res.render('edicion', {prod2Objeto: prod2Objeto, productToEdit});
  
});

router.put ('/edit/:productId',  upload.any(), function (req, res){

   console.log(req.body.nombre);


  let productId = req.params.productId;
 let productToEdit=prod2Objeto.find(producto=> producto.id==productId);

 


   productToEdit.nombre=req.body.nombre;
   productToEdit.marca=req.body.marca;
 productToEdit.descripcion=req.body.descripcion;
   productToEdit.precio=req.body.precio;
   productToEdit.descuento=req.body.descuento;

  


   if  ( req.files.length != 0 ) {
 
     productToEdit.imagen1 = req.files[0].filename;
   } 

  //prod2Objeto.forEach(function(producto){

  // })




  fs.writeFileSync(prod2FilePath, JSON.stringify(prod2Objeto));


  res.send ('Objeto editado')
});

router.delete('/edit/:productId', function(req, res){
console.log (req.params.productId)


let productosFiltrados=prod2Objeto.filter(producto=> producto.id!=req.params.productId)

prod2Objeto=productosFiltrados;

fs.writeFileSync(prod2FilePath, JSON.stringify(prod2Objeto));


res.send ('Objeto Borrado')


})




module.exports = router;
