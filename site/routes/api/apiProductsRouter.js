/************** REQUIRED MODULES **************/
const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const apiProductsController = require(path.join(__dirname,`..`,`..`,`controllers`,`api`,`apiProductsController`));
const apiProductsCreateValidaror = require(path.join(__dirname,`..`,`..`,`middlewares`,`api`,`apiProductsCreateValidaror`));
const db = require(path.join(__dirname,`..`,`..`,`database`,`models`));

/******************* ROUTES *******************/
router.get(`/`, apiProductsController.list);
router.get(`/por_cats`, apiProductsController.listPorCats);
router.get(`/:id`, apiProductsController.prodDetail);
router.post(`/`, apiProductsCreateValidaror, apiProductsController.create);
router.post(`/cart/:id`, apiProductsController.addCart);
router.delete(`/cart/:id`, apiProductsController.deleteCart);
router.put(`/cart/:id`, apiProductsController.editCart);
router.put(`/cart/:id/check_out`, apiProductsController.finishCart);
router.post(`/favs/:id`, async function(req, res){
   db.Favs.findOne({
       where:{ user_id: req.session.usuarioLogeado.id,
        product_id: req.body.product_id}
   })
   .then(resp=> {
    if(resp==null){
        db.Favs.create({
            user_id: req.session.usuarioLogeado.id,
            product_id: req.body.product_id
        },{
            include:[{association:`users`},{association:`products`}]
        })
    }
   })

 
});
router.delete(`/favs/:id`, async function (req, res){
    console.log(req.body)
    db.Favs.destroy({
        where:{ user_id: req.session.usuarioLogeado.id,
            product_id: req.params.id}
    })
});
router.get('/carts',apiProductsController.getAll );
router.get('/carts/:customer', apiProductsController.getOne )



/************** EXPORTING MODULE **************/
module.exports = router;
