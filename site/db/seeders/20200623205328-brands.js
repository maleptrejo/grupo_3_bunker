'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    
    
      return queryInterface.bulkInsert('brands', [

        {
          id: 1,
          name: "Rayovac"
        },
        {
          id: 2,
          name: "stanley"
        },
        {
          id: 3,
          name: "Epson"
        },
        {
          id: 4,
          name: "Baum"
        },
        {
          id: 5,
          name: "Waterdog"
        }


      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('brands', null, {});
    
  }
};
