'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    
    
    return queryInterface.bulkInsert('carts', [
      
     
      {
        user_id: 4,
        status: true, 
        total:1
      },
      {
        user_id: 4,
        status: false, 
        total:1
      },
      {
        user_id: 4,
        status: false, 
        total:1
      },
      {
        user_id: 4,
        status: false, 
        total:1
      },
     
    ]); 
  },
  
  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('carts', null, {});
    
    
  }
}