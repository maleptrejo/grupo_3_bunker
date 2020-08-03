'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

  

    return queryInterface.bulkInsert('customers', [
      {
      name: faker.name.firstName(),
        surname: faker.name.lastName(),
        adress: faker.address.streetAddress(),
        country: faker.address.country(),
        user_id: 3
    },
    {
      name: faker.name.firstName(),
        surname: faker.name.lastName(),
        adress: faker.address.streetAddress(),
        country: faker.address.country(),
        user_id: 4
    },
    {
      name: faker.name.firstName(),
        surname: faker.name.lastName(),
        adress: faker.address.streetAddress(),
        country: faker.address.country(),
        user_id: 5
    },
    {
      name: faker.name.firstName(),
        surname: faker.name.lastName(),
        adress: faker.address.streetAddress(),
        country: faker.address.country(),
        user_id: 6
    },
    {
      name: faker.name.firstName(),
        surname: faker.name.lastName(),
        adress: faker.address.streetAddress(),
        country: faker.address.country(),
        user_id: 7
    },
    {
      name: faker.name.firstName(),
        surname: faker.name.lastName(),
        adress: faker.address.streetAddress(),
        country: faker.address.country(),
        user_id: 8
    },
    {
      name: faker.name.firstName(),
        surname: faker.name.lastName(),
        adress: faker.address.streetAddress(),
        country: faker.address.country(),
        user_id: 9
    },
    {
      name: faker.name.firstName(),
        surname: faker.name.lastName(),
        adress: faker.address.streetAddress(),
        country: faker.address.country(),
        user_id: 10
    }
  ], {});
 },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('customers', null, {});

 }
};

