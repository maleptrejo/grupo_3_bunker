'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    
  
    
    return queryInterface.bulkInsert('favoritos', [
    
      {
       product_id: 1, 
        user_id: 5, 
        },
        {
          product_id: 2, 
           user_id: 5, 
           },

           {
            product_id: 3, 
             user_id: 5, 
             },
             {
               product_id: 4, 
                user_id: 5, 
                },


    ]); 
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('favoritos', null, {});
    
  
  }
}