'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    var personalData= [];

    for (let i=0; i<10; i++) {
      personalData.push({
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        adress: faker.address.streetAddress(),
        country: faker.address.country(),
        user_id: i+1

      });
    }
      return queryInterface.bulkInsert('customers', personalData, {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('customers', null, {});
   
  }
};
