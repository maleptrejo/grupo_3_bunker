'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    var categoryData= [];

    for (let i=0; i<5; i++) {
      categoryData.push({
        name: faker.commerce.department(),
        id: i+1

      });
    }
    
      return queryInterface.bulkInsert('categories', [{}], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('categories', null, {});
    
  }
};
