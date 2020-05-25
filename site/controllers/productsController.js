/************** REQUIRED MODULES **************/
const fs = require('fs');
const path = require('path');

/****************** AUXILIAR ******************/
let productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json')), 'utf8');

/************** MODULE TO EXPORT **************/
const products = {
    list: (req, res, next) => {
        //res.render('????', {productos:productos});
    },
    detail: (req, res, next) => {
        let productoDetallado = productos.find(producto => producto.id == req.params.id);
        res.send(productoDetallado);
        //res.render('producto', {productoDetallado:productoDetallado});
    },
    edit: (req, res, next) => {
        
    },
    create: (req, res, next) => {
        let newProduct = {};
        newProduct.id = parseInt(req.body.id,10);
        newProduct.name = req.body.name;
        newProduct.brand = req.body. brand;
        newProduct.currency = req.body.currency;
        newProduct.price = parseInt(req.body.price,10);
        newProduct.category = req.body.category;
        newProduct.image1 = req.body.image1;
        newProduct.image2 = req.body.image2;
        newProduct.image3 = req.body.image3;
        productos.push(newProduct);
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'), JSON.stringify(productos));
        res.send(newProduct);
    }
};

/************** EXPORTING MODULE **************/
module.exports = products;