const path = require(`path`);
const db = require(path.join(__dirname,`..`,`..`,`database`,`models`));


const apiContactController = {

    list: function (req,res){

        let lim = req.query.limit == undefined ? 10 : Number(req.query.limit);
        let off = req.query.start == undefined ? 0 : Number(req.query.start);
        db.Contact.findAndCountAll({
            where: { name: {[db.Sequelize.Op.like]: req.query.search == undefined ? `%%` : `%`+req.query.search+`%`},
            status: 1
        },
            offset: off,
            limit: lim
        })

        .then((contact) => {
            let listadoJSON = {
                meta: {
                    status: 200,
                    elements_in_page: lim,
                    pagination: {
                        first_page: `http://localhost:3000/api/contact?start=0`,
                        next_page: contact.count > (off+lim) ? `http://localhost:3000/api/contact?start=` + (off+lim) : null,
                        prev_page: off == 0 ? null : `http://localhost:3000/api/contact?start=` + (off-lim),
                        last_page: contact.count % lim <= 5 ? `http://localhost:3000/api/contact?start=` + (Math.round(contact.count/lim,0)*lim) : `http://localhost:3000/api/contact?start=` + ((Math.round(contact.count/lim,0) + 1)*lim)
                    }
                },
                data: contact
            }
            res.json(listadoJSON)
        })

    },

    readMessage: (req, res)=>{
        
        db.Contact.findOne({
            where: {
                id: req.params.id,
                status: 1
            },
        })
        .then((contData)=> {
            let cont={
                id: contData.dataValues.id,
                name: contData.dataValues.name,
                surname: contData.dataValues.surname,
                message: contData.dataValues.message,
                email:contData.dataValues.email,
                status: contData.dataValues.status
            }
            let contactJson = {
                meta: {
                    status: 200
                },
                data: cont
            }
            res.json(contactJson)
            
        }).catch(function(){
            res.send('Error')
        })
    },
    
    deleteMessage: async (req, res) =>{

        db.Contact.update ({
            status: false
        },
        {  
            where: {
                id: req.params.id,
                
            }
        
                
        })
        .then((resultado) => {
            res.json(resultado)
        })
       

    }


}


module.exports = apiContactController;