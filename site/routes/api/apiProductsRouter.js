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
router.post(`/`, apiProductsCreateValidaror, apiProductsController.create);
router.post(`/cart/:id`, apiProductsController.addCart);
router.delete(`/cart/:id`, apiProductsController.deleteCart);
router.put(`/cart/:id`, apiProductsController.editCart);
router.put(`/cart/:id/check_out`, apiProductsController.finishCart);
router.post(`/favs/:id`, apiProductsController.verFav);
router.delete(`/favs/:id`, apiProductsController.deleteFav);
router.get('/carts',apiProductsController.getAll );
router.get('/carts/:customer', apiProductsController.getOne )
router.get('/categories',apiProductsController.categories );
router.get('/categories/:id',apiProductsController.categoriesId );
router.get(`/:id`, apiProductsController.prodDetail);


/************** EXPORTING MODULE **************/
module.exports = router;
