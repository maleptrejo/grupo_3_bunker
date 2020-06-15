const path = require('path');
const db = require(path.join(__dirname,'database','models'));
const sequelize = db.sequelize;


db.Products.create({
    name: `Prueba 1`,
    price: 10.20,
    description: `Descripcion de prueba`,
    brand_id: 1,
    discount_id: 1,
    category_id: 1,
    stock: 13
})