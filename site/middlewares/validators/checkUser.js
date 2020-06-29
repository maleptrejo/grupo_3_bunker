const db= require('../../database/models');
var {check, validationResult, body} = require('express-validator');

function checkUser (req, res, next) {
    

            db.Users.findOne({
                where: {
                    email: req.body.email
                }
            }).then((resultado)=> {
        
                if(resultado==null) {
                next();
                } else {
                    
                  res.send('el usuario ya existe');
                } })
            }
module.exports=checkUser;






 






