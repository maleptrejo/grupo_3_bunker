'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = await queryInterface.sequelize.query('select id from users limit 1', {
      type: Sequelize.QueryTypes.SELECT
    })

    console.log(__filename, 'USERS-ADMIN', users)
    return queryInterface.bulkInsert('admins', [{
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      user_id: users[0].id,
    }], {});

 },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('admins', null, {});

 }
};