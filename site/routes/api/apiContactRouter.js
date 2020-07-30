const express = require(`express`);
const router = express.Router();
const path = require(`path`);
const apiContactController = require(path.join(__dirname,`..`,`..`,`controllers`,`api`,`apiContactController`));

router.get("/", apiContactController.list)

module.exports = router;