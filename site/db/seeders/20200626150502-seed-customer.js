'use strict';
const faker= require ('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users=queryInterface.sequelize.query('select id from users offset 1', {type: Sequelize.QueryTypes.SELECT})

    console.log(users);
    let customers=users.map(user=> {
      return {
        name: faker.name.firstName(),
          surname: faker.name.lastName(),
          user_id: user.id,
          adress: faker.address.streetAddress(),
          country:faker.address.country(),
      }
    })

      return queryInterface.bulkInsert('customers', customers, {});
   
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('customers', null, {});
   
  }
};
