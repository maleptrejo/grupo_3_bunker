'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    var brandData= [];

    for (let i=0; i<10; i++) {
      brandData.push({
        name: faker.company.name(),
        id: i+1

      });
    }
    
      return queryInterface.bulkInsert('brands', [{}], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('brands', null, {});
    
  }
};
