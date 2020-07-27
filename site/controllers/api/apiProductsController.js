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
    listPorCats:(req, res)=>{
        // let lim = req.query.limit == undefined ? 5 : Number(req.query.limit);
        // let off = req.query.start == undefined ? 0 : Number(req.query.start);
        // let ord = req.query.sort == undefined ? `ASC` : Number(req.query.sort);
        db.Products.findAndCountAll({
            where: { name: {[db.Sequelize.Op.like]: req.query.search == undefined ? `%%` : `%`+req.query.search+`%`}},
            include: [{association: `brands`}, {association: `discounts`}, {association: `categories`}],
            // order: [[`name`, ord]],
            // offset: off,
            // limit: lim
        })
        .then((products) => {

            console.log(products.rows[0])
            // console.log(products.rows[0].dataValues.categories.dataValues.name)
            let productsShow=[];
            products.rows.forEach((product)=>{
                let a={
                    id: product.dataValues.id,
                    name: product.dataValues.name,
                    description: product.dataValues.description,
                    relations: {brand: product.dataValues.brands.dataValues.name, categories:product.dataValues.categories.dataValues.name, discounts: product.dataValues.discounts.dataValues.id },
                    detail:   `http://localhost:3000/api/products/${product.dataValues.id}` 
                }
                productsShow.push(a)
            })

                console.log(productsShow)


          
                //con esto que sigue armo el array de cats con productos.
            let cat_ids=[];
            let cat_names=[];
            products.rows.forEach(prod=>{
                let a=prod.dataValues.category_id;
                cat_ids.push(a)
                let b=prod.dataValues.categories.dataValues.name
                cat_names.push(b)
            })

            function foo(cat_names) {
                var a = [], b = [], prev;
                
                cat_names.sort();
                for ( var i = 0; i < cat_names.length; i++ ) {
                    if ( cat_names[i] !== prev ) {
                        a.push(cat_names[i]);
                        b.push(1);
                    } else {
                        b[b.length-1]++;
                    }
                    prev = cat_names[i];
                }
                return [a, b];
            }
            
            var [names,quantities] = foo(cat_names);       
  
        let categorias={}
         names.forEach((n, i)=>{
            categorias[n]=quantities[i]
            })

            let listadoJSON = {
                meta: {
                    status: 200,
                    // elements_in_page: lim,
                    // pagination: {
                    //     first_page: `http://localhost:3000/api/products?start=0`,
                    //     next_page: products.count > (off+lim) ? `http://localhost:3000/api/products?start=` + (off+lim) : null,
                    //     prev_page: off == 0 ? null : `http://localhost:3000/api/products?start=` + (off-lim),
                    //     last_page: products.count % lim <= 5 ? `http://localhost:3000/api/products?start=` + (Math.round(products.count/lim,0)*lim) : `http://localhost:3000/api/products?start=` + ((Math.round(products.count/lim,0) + 1)*lim)
                    // }
                },
                countByCategory: categorias, products:productsShow
            }
            res.json(listadoJSON)
        })
    },
    prodDetail: (req, res)=>{
  
        db.Products.findOne({
            where: {
                id: req.params.id,
            },
            include: [{association: `brands`}, {association: `discounts`}, {association: `categories`}],
        })
        .then((resp)=> {
            let prod={
                id: resp.dataValues.id,
                name: resp.dataValues.name,
                description: resp.dataValues.description,
                img: `http://localhost:3000/images/productos/${resp.dataValues.image1}`,
                relations: {brand: resp.dataValues.brands.dataValues.name, categories:resp.dataValues.categories.dataValues.name, discounts: resp.dataValues.discounts.dataValues.id },
            }
            let userJson = {
                meta: {
                    status: 200
                },
                data: prod
            }
            res.json(userJson)

           }).catch(function(){
            res.send('Error')
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
    },
    getAll: (req, res) =>{
        db.Carts.findAll({
            include: [{association: `products`}],
        })
        .then((carts)=> {
            let cartsJson = {
                meta: {
                    status: 200
                },
                data: carts
            }
            res.json(cartsJson)
        })
        .catch(function(){
            res.send('Error')
        })
    },
    getOne: (req, res)=>{
        db.Carts.findOne({
            where: {
                user_id: req.params.customer,
                status:true
            },
            include: [{
                association: `products`,
                through: {
                  attributes: ['qty', 'price'],
                }
              }]
        })
        .then((resp)=> {
            console.log(resp)
            if(resp==null){

            }else{
                let cartJson={
                    meta: {
                        status: 200
                    },
                    data: resp
                }
                res.json(cartJson)
            }
           }).catch(function(){
            res.send('Error')
        })
    },
    addCart: async function (req, res){
       let cart= await db.Carts.findOne({
            where:{ user_id: req.session.usuarioLogeado.id,
             status: true}
        })
        if(cart!=null) {
            cart.addProduct(req.body.product_id)
        } else {
            db.Carts.create({
                user_id: req.session.usuarioLogeado.id,
             status: true,
             total: 0
            }).then((rta)=>{
                rta.addProduct(req.body.product_id)
            })
            .then((fin)=>{
                res.json(fin)
            })
        }
        

     //crear carrito si no hay ninguno
    },
    deleteCart: async function (req, res){
        // console.log('acà')
        let cart= await db.Carts.findOne({
            where:{ user_id: req.session.usuarioLogeado.id,
             status: true}
        })
        console.log(req.body.product_id)
        cart.removeProduct(req.params.id)
    },
    editCart: async function (req, res){


        db.Carts.findOne({
            where:{ user_id: req.session.usuarioLogeado.id,
             status: true}
        }).then((cart)=> {

            // cart.getProducts().then((rta)=>{
            //     console.log(rta)
            // })

            // cart.removeProduct()
            // cart.addProduct(req.params.id, {trough:{qty: req.body.qty}}, )


            db.Cart_prod.update(
                {qty: req.body.qty},
                {where: {product_id: req.params.id, cart_id: cart.id}}
            )
        })
        .then((fin)=>{
            res.json(fin)
        })
    },
    finishCart: async function(req, res){
        console.log(req.body)


       let cart= await db.Carts.findOne({
            where:{ user_id: req.session.usuarioLogeado.id,
             status: true}
        })
        cart.update(
                
                {total: req.body.total, status: false}
                // {where: {user_id: req.session.usuarioLogeado.id, cart_id: rta.id}}
            ).then((fin)=>{
                console.log('......')
                console.log(fin)
                res.json(fin)
            })
           
         

        // db.Carts.update(
        //     {total: req.body.total},
        //     {where:{ user_id: req.session.usuarioLogeado.id,
        //              status: true}}
        //     )



    }

};

/************** EXPORTING MODULE **************/
module.exports = apiProducts;
