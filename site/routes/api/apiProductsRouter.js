/************** REQUIRED MODULES **************/
const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const apiProductsController = require(path.join(__dirname,`..`,`..`,`controllers`,`api`,`apiProductsController`));
const apiProductsCreateValidaror = require(path.join(__dirname,`..`,`..`,`middlewares`,`api`,`apiProductsCreateValidaror`));
const db = require(path.join(__dirname,`..`,`..`,`database`,`models`));

/******************* ROUTES *******************/
router.get(`/`, apiProductsController.list);
router.post(`/`, apiProductsCreateValidaror, apiProductsController.create);
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

 
})
router.delete(`/favs/:id`, async function (req, res){
    console.log(req.body)
    db.Favs.destroy({
        where:{ user_id: req.session.usuarioLogeado.id,
            product_id: req.params.id}
    })
});



/************** EXPORTING MODULE **************/
module.exports = router;
