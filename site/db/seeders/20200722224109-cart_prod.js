'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('cart_prod', [

      {
        product_id: 4,
        cart_id: 1,
        qty: 1, 
        price: 1
      },
      {
        product_id: 5,
        cart_id: 2,
        qty: 1, 
        price: 1
      },
     
    ]); 
  },
  
  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('cart_prod', null, {});
    
    
  }
}