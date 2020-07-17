'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    
    
      return queryInterface.bulkInsert('categories', [
        {
          id: 1,
          name: "Outdoor",
          image: "outdoor.png"
        },
        {
          id: 2,
          name: "Diseño Sustentable",
          image: "muebles.jpg"
        },
        {
          id: 3,
          name: "Sado",
          image: "greyshadows.jpg"
        },
        {
          id: 4,
          name: "Taller",
          image: "herramientas.jpg"
        },
        {
          id: 5,
          name: "Bazar",
          image: "bazar.jpg"
        }

      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('categories', null, {});
    
  }
};
