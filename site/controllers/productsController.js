/************** REQUIRED MODULES **************/

const fs = require('fs');
const path = require('path');
const multer=require('multer');


const usersFilePath= path.join(__dirname, '../data/usuarios.json');
const usersObjeto = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const prod2FilePath= path.join(__dirname, '../data/productos2.json');
var prod2Objeto = JSON.parse(fs.readFileSync(prod2FilePath, 'utf-8'));

// console.log(usersObjeto[1]);s
let arrayUsuarios=[];
arrayUsuarios.push(usersObjeto[1]);
arrayUsuarios.push(usersObjeto[2]);

/****************** AUXILIAR ******************/
let productos = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/productos.json')), 'utf8');

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

/************** MODULE TO EXPORT **************/
const products = {
    list: (req, res, next) => {
        res.render('producto2', {productoDetallado:prod2Objeto});
    },
    detail: (req, res, next) => {
        let encontrado = prod2Objeto.find(producto => producto.id == req.params.id);
        if(encontrado == undefined){
            res.send ("No existe el producto");
        };
        res.render('producto2', {productoDetallado:encontrado});
    },
    edit: (req, res) => {
        let productId = req.params.productId;
        let productToEdit=prod2Objeto.find(producto=> producto.id==productId);
        res.render('edicion', {prod2Objeto: prod2Objeto, productToEdit});
    },
    createForm: (req, res) =>{
        res.render('carga');
    },
    create: (req, res) => {
        let producto ={
            id: 0,
            nombre: null,
            marca: null,
            descripcion: null,
            imagen1: undefined,
            precio: null,
            descuento: null,
        };
        if (isEmptyObject(prod2Objeto)){
            producto.id=1;
        } else {
            producto.id=prod2Objeto[prod2Objeto.length-1].id+1;
        };
        if (req.files == undefined) {
            producto.imagen1 = 'n/a';
        } else {
            producto.imagen1 = req.files[0].filename;
        };
        producto.nombre=req.body.nombre;
        producto.marca=req.body.marca;
        producto.descripcion=req.body.descripcion;
        producto.precio=req.body.precio;
        producto.descuento=req.body.descuento;
        prod2Objeto.push(producto)
        fs.writeFileSync(prod2FilePath, JSON.stringify(prod2Objeto));
        res.render ('producto2', {productoDetallado:producto})
    },
    
    delete: (req,res)=>{
        let productosFiltrados=prod2Objeto.filter(producto=> producto.id!=req.params.productId);
        prod2Objeto=productosFiltrados;
        fs.writeFileSync(prod2FilePath, JSON.stringify(prod2Objeto));
        res.redirect ('/products');
    }
    
    
    
};

/************** EXPORTING MODULE **************/
module.exports = products;