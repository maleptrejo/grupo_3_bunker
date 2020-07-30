const path = require(`path`);
const db = require(path.join(__dirname,`..`,`database`,`models`));
const {check, validationResult, body} = require('express-validator');

const contact = {

    form: function (req,res){
        res.render(`contacto`)
    },

    send: function (req, res){
        let errors = validationResult(req);
        if (errors.isEmpty()){
            db.Contact.create({
                name: req.body.name,
                surname: req.body.sName,
                email: req.body.email,
                message: req.body.message            
            }).then((create) => {
                res.json(create)
            });

        res.redirect(`/`)
        } else{
            res.render('contacto', {errors:errors.errors})
        }
    }


}

module.exports = contact;