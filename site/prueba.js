const path = require('path');
const db = require(path.join(__dirname,'database','models'));
const sequelize = db.sequelize;



db.Products.create({
    name: `Prueba 5`,
    price: 526.85,
    description: `Esta es una linda descripcion del producto Prueba 5`,
    brand_id: 5,
    discount_id: 5,
    category_id: 5,
    stock: 150
})