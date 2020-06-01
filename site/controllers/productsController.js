/************** REQUIRED MODULES **************/
const fs = require('fs');
const path = require('path');
const multer=require('multer');

/*************** REQUIRED FILES ***************/
const usersFilePath= path.join(__dirname, '../data/usuarios.json');
const usersObjeto = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const prod2FilePath= path.join(__dirname, '../data/productos2.json');
var prod2Objeto = JSON.parse(fs.readFileSync(prod2FilePath, 'utf-8'));

let arrayUsuarios=[];
arrayUsuarios.push(usersObjeto[1]);
arrayUsuarios.push(usersObjeto[2]);

/****************** AUXILIAR ******************/
function isEmptyObject(objeto){
    return !Object.keys(objeto).length;
};

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
        let productoDetallado =[];
        productoDetallado.push(encontrado);
        res.render('producto2', {productoDetallado:productoDetallado});
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
        let productoCargado = [];
        prod2Objeto.push(producto)
        productoCargado.push(producto);
        fs.writeFileSync(prod2FilePath, JSON.stringify(prod2Objeto));
        res.render ('producto2', {productoDetallado:productoCargado})
    },
        delete: (req,res)=>{
        let productosFiltrados=prod2Objeto.filter(producto=> producto.id!=req.params.productId);
        prod2Objeto=productosFiltrados;
        fs.writeFileSync(prod2FilePath, JSON.stringify(prod2Objeto));
        res.redirect ('/products');
    }
};

/************** EXPORTED MODULE **************/
module.exports = products;