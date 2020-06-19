'use strict';
const faker =require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
      
      return queryInterface.bulkInsert('admins', [
        {
          name: faker.name.firstName(),
          surname: faker.name.lastName(),
          user_id:1
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('admins', null, {});
   
  }
};