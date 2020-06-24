'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    
    
      return queryInterface.bulkInsert('categories', [
        {
          id: 1,
          name: "Outdoor"
        },
        {
          id: 2,
          name: "Diseño Sustentable"
        },
        {
          id: 3,
          name: "Sado"
        },
        {
          id: 4,
          name: "Taller"
        },
        {
          id: 5,
          name: "Bazar"
        }

      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('categories', null, {});
    
  }
};
