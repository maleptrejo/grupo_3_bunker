/************** REQUIRED MODULES **************/
const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const apiProductsController = require(path.join(__dirname,`..`,`..`,`controllers`,`api`,`apiProductsController`));
const apiProductsCreateValidaror = require(path.join(__dirname,`..`,`..`,`middlewares`,`api`,`apiProductsCreateValidaror`));

/******************* ROUTES *******************/
router.get(`/`, apiProductsController.list);
router.post(`/`, apiProductsCreateValidaror, apiProductsController.create);


/************** EXPORTING MODULE **************/
module.exports = router;
