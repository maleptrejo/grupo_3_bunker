'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    
    
      return queryInterface.bulkInsert('categories', [
        {
          id: 1,
          name: "Outdoor",
          image: "wet-empty-road-wallpaper.jpg"
        },
        {
          id: 2,
          name: "Diseño Sustentable",
          image: "SUSTENTABLE.jpg"
        },
        {
          id: 3,
          name: "Sado",
          image: "SADO.jpg"
        },
        {
          id: 4,
          name: "Taller",
          image: "tools-installation-floor.jpg"
        },
        {
          id: 5,
          name: "Bazar",
          image: "BAZARBOT.jpg"
        }

      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('categories', null, {});
    
  }
};
