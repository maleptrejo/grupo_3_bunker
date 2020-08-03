/************** REQUIRED MODULES **************/
const path = require(`path`);
const db = require(path.join(__dirname,`..`,`..`,`database`,`models`));
const { check, validationResult, body } = require('express-validator');

/************** MODULE TO EXPORT **************/
var validator = [
    check(`name`).isLength({min:5}).withMessage(`The key 'name' is missing or has en invalid value (5 caracters at least).`),
    check(`price`).isNumeric().withMessage(`The key 'price' is missing or has en invalid value (it must be a number).`),
    check(`desc`).isLength({min:15}).withMessage(`The key 'desc' is missing or has en invalid value (15 caracters at least).`),
    body(`brand`).custom(function(brand){
        return db.Brands.findByPk(brand).then(resultado => {
            if(resultado == null) {
               return Promise.reject();
           }
         })
    }).withMessage(`The key 'brand' is missing or is not declarated`),
    body(`disc`).custom(function(discount){
        return db.Discounts.findByPk(discount).then(resultado => {
            if(resultado == null) {
               return Promise.reject();
           }  
        })
    }).withMessage(`The key 'disc' is missing or is not declarated`),
    body(`cat`).custom(function(category){
        return db.Categories.findByPk(category).then(resultado => {
            if(resultado == null) {
               return Promise.reject();
           } 
        })
    }).withMessage(`The key 'cat' is missing or is not declarated`)
];

/************** EXPORTING MODULE **************/
module.exports = validator;