/************** REQUIRED MODULES **************/


/*************** REQUIRED FILES ***************/


/****************** AUXILIAR ******************/


/************** MODULE TO EXPORT **************/
const users = {
    vistaPerfil: (req, res, next) => {
        res.render('vistaPerfil');
    },
    formLogin: (req, res, next) => {
        res.render('formLogin');
    },
    login: (req, res, next) => {
        
        res.send(req.body);
    }
};

/************** EXPORTED MODULE **************/
module.exports = users;