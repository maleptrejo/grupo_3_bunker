/************** REQUIRED MODULES **************/
const path = require(`path`);
const db = require(path.join(__dirname,`..`,`..`,`database`,`models`));
const {check, validationResult, body} = require(`express-validator`);

/************** MODULE TO EXPORT **************/
const apiUsersController = {
/************** LIST PROPERTIES **************

1.PARA MODIFICAR LA CANTIDAD DE ELEMENTOS POR HOJA EN EL PAGINADO HAY QUE ENVIAR POR QUERYSTRING  UNA KEY "limit", POR DEFECTO ES 5 ELEMENTOS POR PAGINA.-

2.PARA MODIFICAR EL INICIO DEL LISDATO DE RESULTADOS HAY QUE ENVIAR POR QUERYSTRING UNA KEY "start", POR DEFECTO ES 0.-

3. PARA MODIFICAR EL ORDEN ASCENDENTE O DESCENDENTE DE LA LOS ELEMENTOS SEGUN EL NOMBRE DEL PRODUCTO HAY QUE ENVIAR POR QUERYSTRING UNA KEY "sort", POR DEFECTO ES `ASC`.-

4.PARA HACER UNA BUSQUEDA POR NOMBRE DE PRODUCTO HAY QUE ENVIAR POR QUERYSTRING UNA KEY "search", POR DEFECTO EL ISTADO PROPORCIONA TODOS LOS ELEMENTOS DISPONIBLES EN LA BASE DE DATOS.-
*/
    list: (req, res) => {
        let lim = req.query.limit == undefined ? 5 : Number(req.query.limit);
        let off = req.query.start == undefined ? 0 : Number(req.query.start);
        let ord = req.query.sort == undefined ? `ASC` : Number(req.query.sort);
        db.Users.findAndCountAll({
            where: { email: {[db.Sequelize.Op.like]: req.query.search == undefined ? `%%` : `%`+req.query.search+`%`}},
            include: [{association: `admins`}, {association: `customers`}],
            order: [[`email`, ord]],
            offset: off,
            limit: lim
        })
        .then((users) => {
            let listadoJSON = {
                meta: {
                    status: 200,
                    elements_in_page: lim,
                    pagination: {
                        first_page: `http://localhost:3000/api/users?start=0`,
                        next_page: users.count > (off+lim) ? `http://localhost:3000/api/users?start=` + (off+lim) : null,
                        prev_page: off == 0 ? null : `http://localhost:3000/api/users?start=` + (off-lim),
                        last_page: users.count % lim <= 5 ? `http://localhost:3000/api/users?start=` + (Math.round(users.count/lim,0)*lim) : `http://localhost:3000/api/products?start=` + ((Math.round(users.count/lim,0) + 1)*lim)
                    }
                },
                data: users
            }
            res.json(listadoJSON)
        })
    },
    FavsAll: (req, res)=> {
        db.Favs.findAll({
            include: [{association: `users`}],
        })
        .then((favs)=> {

            
            let favJson = {
                meta: {
                    status: 200
                },
                data: favs
            }

            res.json(favJson)


        })
        .catch(function(){
            res.send('Error')
        })
    },
    
};

/************** EXPORTING MODULE **************/
module.exports = apiUsersController;
