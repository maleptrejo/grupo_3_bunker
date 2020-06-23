'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    var discountData= [];

    for (let i=0; i<3; i++) {
      discountData.push({
        level: faker.commerce.price(50,200),
        id: i+1

      });
    }
    
      return queryInterface.bulkInsert('discounts', [{}], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('discounts', null, {});
    
  }
};
