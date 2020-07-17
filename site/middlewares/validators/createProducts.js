/************** REQUIRED MODULES **************/
const path = require(`path`);
const db = require(path.join(__dirname,`..`,`..`,`database`,`models`));
const { check, validationResult, body } = require('express-validator');

/************** MODULE TO EXPORT **************/
var validator = [
    check(`name`).isLength({min:5}).withMessage(`El campo "Nombre" debe contener al menos 5 caracteres.`),
    check(`price`).isNumeric().withMessage(`The key 'price' is missing or has en invalid value (it must be a number).`),
    check(`description`).isLength({min:15}).withMessage(`The key 'desc' is missing or has en invalid value (15 caracters at least).`),
    body(`brand_id`).custom(function(brand){
        return db.Brands.findByPk(brand).then(resultado => {
            if(resultado == null) {
               return Promise.reject();
           }
         })
    }).withMessage(`The key 'brand' is missing or is not declarated`),
    body(`discount_id`).custom(function(discount){
        return db.Discounts.findByPk(discount).then(resultado => {
            if(resultado == null) {
               return Promise.reject();
           }  
        })
    }).withMessage(`The key 'disc' is missing or is not declarated`),
    body(`category_id`).custom(function(category){
        return db.Categories.findByPk(category).then(resultado => {
            if(resultado == null) {
               return Promise.reject();
           } 
        })
    }).withMessage(`The key 'cat' is missing or is not declarated`),
    check(`stock`).isNumeric().withMessage(`The key 'price' is missing or has en invalid value (it must be a number).`)
];

/************** EXPORTING MODULE **************/
module.exports = validator;