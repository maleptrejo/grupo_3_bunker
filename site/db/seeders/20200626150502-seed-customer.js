'use strict';
const faker= require ('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('customers', [{
        name: faker.name.firstName(),
          surname: faker.name.lastName(),
          user_id:1,
          adress: faker.address.streetAddress(),
          country:faker.address.country(),
      }], {});
   
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('customers', null, {});
   
  }
};
