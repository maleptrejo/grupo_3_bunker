/************** REQUIRED MODULES **************/
const path = require(`path`);
const db = require(path.join(__dirname,`..`,`database`,`models`));
const {check, validationResult, body} = require(`express-validator`);

/****************** AUXILIAR ******************/
const format = n => new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(n)

/************** MODULE TO EXPORT **************/
const products = {
    list: (req, res) => {
        db.Products.findAll({
            include: [{association: `brands`}, {association: `discounts`}, {association: `categories`}],
            order: [[`name`, `ASC`]],
        })
        .then((productoDetallado) => {
            console.log(productoDetallado);
            res.render(`productList`, {productoDetallado: productoDetallado});
        })
    },
    detail: (req, res) => {
        let lastArrival = db.Products.findAll({
            include: [{association: `brands`}, {association: `discounts`}, {association: `categories`}],
            order: [[`name`, `DESC`]],
            limit: 4
        })
        let product = db.Products.findByPk(req.params.id, {include: [{association: `brands`}, {association: `discounts`}, {association: `categories`}]})
        Promise.all([lastArrival, product])
        .then(([lastArrival, product]) => {
            let productoDetallado = []
            productoDetallado.push(product)
            
            res.render(`producto2`, {format: format, productoDetallado: productoDetallado, lastArrival: lastArrival})
        })
    },
    editForm: (req, res) => {
        let errors = undefined
        let categories = db.Categories.findAll({attributes: [`id`, `name`]});   
        let brands = db.Brands.findAll({attributes: [`id`, `name`]});
        let discounts = db.Discounts.findAll({attributes: [`id`, `level`], raw: true});
        let productToEdit = db.Products.findByPk(req.params.productId, {include: [{association: `brands`}, {association: `discounts`}, {association: `categories`}]})
        Promise.all([productToEdit, categories, brands, discounts])    
        .then(([productToEdit, categories, brands, discounts]) => {
            res.render(`edicion`, {productToEdit: productToEdit, categories: categories, brands: brands, discounts: discounts, errors:errors});
        })
    },
    edit: (req, res) => {
        let errors = validationResult(req);
            if (errors.isEmpty()){
                db.Products.update(
                    {
                        name: req.body.name,
                        price: req.body.price,
                        description: req.body.description,
                        brand_id: req.body.brand_id,
                        discount_id: req.body.discount_id,
                        category_id: req.body.category_id,
                        stock: req.body.stock
                    },
                    {
                        where:{
                            id: req.params.productId
                        }
                }).then((edited) => {
                        console.log(edited);
                        res.redirect(`/products/cargaImagenesForm/${req.params.productId}`);
                })
            }else {
                let categories = db.Categories.findAll({attributes: [`id`, `name`]});   
                let brands = db.Brands.findAll({attributes: [`id`, `name`]});
                let discounts = db.Discounts.findAll({attributes: [`id`, `level`], raw: true});
                let productToEdit = db.Products.findByPk(req.params.productId, {include: [{association: `brands`}, {association: `discounts`}, {association: `categories`}]})
                Promise.all([productToEdit, categories, brands, discounts])    
                .then(([productToEdit, categories, brands, discounts]) => {
                    res.render(`edicion`, {productToEdit: productToEdit, categories: categories, brands: brands, discounts: discounts, errors:errors.errors});
        })
            }
                
        },
        createForm: async(req, res) => {
            let errors = undefined
            let categories = await db.Categories.findAll({attributes: [`id`, `name`], raw: true});   
            let brands = await db.Brands.findAll({attributes: [`id`, `name`], raw: true});
            let discounts = await db.Discounts.findAll({attributes: [`id`, `level`], raw: true});
            res.render(`carga`, {categories: categories, brands: brands, discounts: discounts, errors:errors});
        },
        create: async(req, res) => {
            let errors = validationResult(req);
            if (errors.isEmpty()){
                db.Products.create({
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    brand_id: req.body.brand_id,
                    discount_id: req.body.discount_id,
                    image1: `noFoto.jpg`,
                    image2: `noFoto.jpg`,
                    image3: `noFoto.jpg`,
                    category_id: req.body.category_id,
                    stock: req.body.stock
                }).then((created) => {
                    res.redirect(`/products/cargaImagenesForm/${created.id}`);
                })
            } else {
                let categories = await db.Categories.findAll({attributes: [`id`, `name`], raw: true});   
                let brands = await db.Brands.findAll({attributes: [`id`, `name`], raw: true});
                let discounts = await db.Discounts.findAll({attributes: [`id`, `level`], raw: true});
                res.render('carga', {errors:errors.errors, categories: categories, brands: brands, discounts: discounts});
            }
        },
        uploadImagesForm: (req, res) => {
            archivos = [];
            db.Products.findByPk(req.params.id, {
                include: [{association: `brands`}, {association: `categories`}]
            })
            .then((created) => {
                res.render(`cargaImagenes`, {created: created})
            })   
        },
        uploadImages: (req, res) => {
            let [image1, image2, image3] = [`noFoto.jpg`,`noFoto.jpg`,`noFoto.jpg`]
            console.log(req.files);
            if (req.files.length > 0){
                image1 = req.files[0].filename;
                image2 = (req.files[1] != undefined) ? req.files[1].filename : req.files[0].filename;
                image3 = (req.files[2] != undefined) ? req.files[2].filename : req.files[0].filename;
            }
            db.Products.update(
                {
                    image1: image1,
                    image2: image2,
                    image3: image3
                },
                {
                    where:{
                        id: req.params.id
                    }
                })
                .then(() => {
                    res.redirect(`/products/${req.params.id}`)
                })
        },
        delete: (req,res)=>{
            db.Products.destroy({
                where: {
                    id: req.params.productId
                }
            })
            res.redirect (`/products`);
        },
        root: (req, res) => {
            db.Discounts.findAll({
                where: {
                    level: {[db.Sequelize.Op.gte]: 0.5} 
                }
            }).then((discounts) => {
                let idDiscounts = []
                discounts.forEach(discount => idDiscounts.push(discount.id))
                let promotions = db.Products.findAll({
                    where: {
                        discount_id : idDiscounts
                    },
                    include: [{association: `brands`}, {association: `discounts`}, {association: `categories`}],
                    order: [[`name`, `ASC`]],
                    limit: 4
                })
                let lastArrival = db.Products.findAll({
                    include: [{association: `brands`}, {association: `discounts`}, {association: `categories`}],
                    order: [[`name`, `DESC`]],
                    limit: 4
                })
                let categories = db.Categories.findAll({
                    limit: 3
                })
                Promise.all([promotions, lastArrival, categories])
                .then(([promotions, lastArrival, categories]) => {
                    res.render(`index`, {promotions: promotions, lastArrival: lastArrival, categories: categories})
                })
            })
        },
        search: (req, res) => {
            db.Products.findAll({
                where: {
                    name:{[db.Sequelize.Op.like]:`%`+req.query.search+`%`}
                },
                include: [{association: `brands`}, {association: `discounts`}, {association: `categories`}],
                order: [[`name`, `ASC`]]
            })
            .then((prductsSearch) => {
                res.render(`productosBuscados`, {prductsSearch:prductsSearch})
                
            })
        },
        brandsCategoriesDiscounts: (req, res) => {
            let idCat = db.Categories.findAll({order: [[`name`, `ASC`]]})
            let idBran = db.Brands.findAll({order: [[`name`, `ASC`]]})
            let idDisc = db.Discounts.findAll({order: [[`level`, `ASC`]]})
            Promise.all([idCat, idBran, idDisc])
            .then(([idCat, idBran, idDisc]) => {
                res.render(`extras`, {categories:idCat, brands:idBran, discounts:idDisc})
            })
        },
        extrasUpdate: (req, res) => {
            if (req.body.categoryDeleteChk = `on`){
                db.Categories.findOne({where:{name:req.body.categoryDelete}}).then((resultado) =>{
                    db.Products.destroy({where:{category_id:resultado.id}}).then(() => {
                        db.Categories.destroy({where:{name:req.body.categoryDelete}})
                    })
                })
            }
            if(req.body.categoryCreate != `` && req.body.categoryCreate != ` ` && req.body.categoryCreate != undefined){
                db.Categories.create({
                    name: req.body.categoryCreate,
                    image: 'noCategoryPhoto.jpg'
                })
            }
            if (req.body.brandDeleteChk = `on`){
                db.Brands.findOne({where:{name:req.body.brandDelete}}).then((resultado) =>{
                    db.Products.destroy({where:{brand_id:resultado.id}}).then(() => {
                        db.Brands.destroy({where:{name:req.body.brandDelete}})
                    })
                })
            }
            if(req.body.brandCreate != `` && req.body.brandCreate != ` ` && req.body.brandCreate != undefined){
                db.Brands.create({
                    name: req.body.brandCreate,
                })
            }
            if (req.body.discountDeleteChk = `on`){
                let discountToDelete = db.Discounts.findOne({where:{level:Number(req.body.discountDelete)}})
                let discountZero = db.Discounts.findOne({where:{level:0}})
                Promise.all([discountToDelete, discountZero])
                .then(([discountToDelete, discountZero]) => {
                    db.Products.update({discount_id: discountZero.id},{where:{discount_id:discountToDelete.id}})
                    .then(() => {
                        db.Discounts.destroy({where:{id:discountToDelete.id}})
                    })
                })
            }
            if(req.body.discountCreate != `` && req.body.discountCreate != ` ` && req.body.discountCreate != undefined){
                db.Discounts.create({
                    level: Number(req.body.discountCreate),
                })
            }
        },
        catsShow: (req, res) =>{
            
            db.Categories.findOne({where:{id:req.params.id}})
            .then(rta=>{
                if(rta!=null){
                    let infoCat={
                        id:rta.dataValues.id,
                        name:rta.dataValues.name
                    }
                    console.log(infoCat)
                    res.render('prodCats', {infoCat:infoCat})
                }else{
                    return Promise.reject('Error...')
                }
            })
            .catch(function(){
                res.send('Error')
            })   
        },
        categoryPhotoForm: (req, res) => {
            db.Categories.findAll({order: [[`name`, `ASC`]]})
            .then((categories) => {
                res.render(`categoryPhoto`, {categories: categories})
            })   
        },
        categoryPhoto: (req, res) => {
            db.Categories.update(
                {
                    image: req.files[0].filename,
                },
                {
                    where:{
                        id: req.body.categorySelect
                    }
                })
                .then(() => {
                    res.redirect(`/`)
                })
        }
    };
    
    /************** EXPORTED MODULE **************/
    module.exports = products;