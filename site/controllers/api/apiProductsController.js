/************** REQUIRED MODULES **************/
const path = require(`path`);
const db = require(path.join(__dirname,`..`,`..`,`database`,`models`));
const {check, validationResult, body} = require(`express-validator`);

/************** MODULE TO EXPORT **************/
const apiProducts = {
/************** LIST PROPERTIES **************

1.PARA MODIFICAR LA CANTIDAD DE ELEMENTOS POR HOJA EN EL PAGINADO HAY QUE ENVIAR POR QUERYSTRING  UNA KEY "limit", POR DEFECTO ES 5 ELEMENTOS POR PAGINA.-

2.PARA MODIFICAR EL INICIO DEL LISDATO DE RESULTADOS HAY QUE ENVIAR POR QUERYSTRING UNA KEY "start", POR DEFECTO ES 0.-

3. PARA MODIFICAR EL ORDEN ASCENDENTE O DESCENDENTE DE LA LOS ELEMENTOS SEGUN EL NOMBRE DEL PRODUCTO HAY QUE ENVIAR POR QUERYSTRING UNA KEY "sort", POR DEFECTO ES `ASC`.-

4.PARA HACER UNA BUSQUEDA POR NOMBRE DE PRODUCTO HAY QUE ENVIAR POR QUERYSTRING UNA KEY "search", POR DEFECTO EL ISTADO PROPORCIONA TODOS LOS ELEMENTOS DISPONIBLES EN LA BASE DE DATOS.-
*/
    list: (req, res) => {
        let lim = req.query.limit == undefined ? 5 : Number(req.query.limit);
        let off = req.query.start == undefined ? 0 : Number(req.query.start);
        let ord = req.query.sort == undefined ? `ASC` : Number(req.query.sort);
        db.Products.findAndCountAll({
            where: { name: {[db.Sequelize.Op.like]: req.query.search == undefined ? `%%` : `%`+req.query.search+`%`}},
            include: [{association: `brands`}, {association: `discounts`}, {association: `categories`}],
            order: [[`name`, ord]],
            offset: off,
            limit: lim
        })
        .then((products) => {
            let listadoJSON = {
                meta: {
                    status: 200,
                    elements_in_page: lim,
                    pagination: {
                        first_page: `http://localhost:3000/api/products?start=0`,
                        next_page: products.count > (off+lim) ? `http://localhost:3000/api/products?start=` + (off+lim) : null,
                        prev_page: off == 0 ? null : `http://localhost:3000/api/products?start=` + (off-lim),
                        last_page: products.count % lim <= 5 ? `http://localhost:3000/api/products?start=` + (Math.round(products.count/lim,0)*lim) : `http://localhost:3000/api/products?start=` + ((Math.round(products.count/lim,0) + 1)*lim)
                    }
                },
                data: products
            }
            res.json(listadoJSON)
        })
    },
    create: (req, res) => {
/************** CREATE PROPERTIES **************

1.PARA CREAR UN PRODUCTO DE DEBEN ENVIAR LAS OBLIGATORIAMENTE POR QUERYSTRING LAS KEY "name", "price", "desc", "brand", "disc", "cat" Y "stock". LA KEY "image" NO ES OBLIGATORIA, PERO EL ARTICULO TOMARA EL VALOR "noFoto" PARA EL PRODUCTO QUE SE ESTE CARGANDO-
*/  
        let errors = validationResult(req).errors;
        if (errors.length > 0) {
            res.send(errors)
        };
        db.Products.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.desc,
            brand_id: req.body.brand,
            discount_id: req.body.disc,
            image: req.body.image == undefined ? `noFoto.png` : req.body.image,
            category_id: req.body.cat,
            stock: req.body.stock
        }).then((created) => {
            let createdJSON = {
                meta: {
                    status: 201
                },
                data: created
            }
            res.json(createdJSON)
        })
    }
};

/************** EXPORTING MODULE **************/
module.exports = apiProducts;
