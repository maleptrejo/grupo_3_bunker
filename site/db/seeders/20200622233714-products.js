'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    var productData= [];

    for (let i=0; i<10; i++) {
      productData.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(800,1000),
        description: faker.random.paragraph(2),
        stock: faker.random.number(1,100),
        id: i+1,
        category_id: faker.random.number(1,5),
        brand_id: faker.random.number(1,10),
        discount_id: faker.random.number(1,3)
      });
      
    }
    
    return queryInterface.bulkInsert('products', [{}]); 
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('products', null, {});
    
  
  }
}