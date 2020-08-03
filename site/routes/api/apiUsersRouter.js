/************** REQUIRED MODULES **************/
const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const apiUsersController = require(path.join(__dirname,`..`,`..`,`controllers`,`api`,`apiUsersController`));
const apiProductsCreateValidaror = require(path.join(__dirname,`..`,`..`,`middlewares`,`api`,`apiProductsCreateValidaror`));

/******************* ROUTES *******************/
router.get(`/`, apiUsersController.list);
router.get(`/favs_full`, apiUsersController.FavsAll);
router.get(`/list`, apiUsersController.listApi);
router.get(`/:id`, apiUsersController.userId);




/************** EXPORTING MODULE **************/
module.exports = router;
