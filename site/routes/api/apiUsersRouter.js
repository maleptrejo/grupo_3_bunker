/************** REQUIRED MODULES **************/
const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const apiUsersController = require(path.join(__dirname,`..`,`..`,`controllers`,`api`,`apiUsersController`));
const apiProductsCreateValidaror = require(path.join(__dirname,`..`,`..`,`middlewares`,`api`,`apiProductsCreateValidaror`));

/******************* ROUTES *******************/
router.get(`/`, apiUsersController.list);



/************** EXPORTING MODULE **************/
module.exports = router;
