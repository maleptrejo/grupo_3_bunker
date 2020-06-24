'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    // var discountData= [];

    // for (let i=0; i<3; i++) {
    //   discountData.push({
    //     level: faker.commerce.price(50,200),
    //     id: i+1

    //   });
    // }
    
      return queryInterface.bulkInsert('discounts', [
        {
          id: 1,
          level: 0.1
        },
        {
          id: 2,
          level: 0.2
        },
        {
          id: 3,
          level: 0.3
        },
        {
          id: 4,
          level: 0.4
        },
        {
          id: 5,
          level: 0.5
        },

      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('discounts', null, {});
    
  }
};
