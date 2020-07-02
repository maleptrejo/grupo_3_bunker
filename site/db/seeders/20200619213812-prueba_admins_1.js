'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // var personalData= [];

    // for (let i=0; i<10; i++) {
    //   personalData.push({
    //     name: faker.name.firstName(),
    //     surname: faker.name.lastName(),
    //     adress: faker.address.streetAddress(),
    //     country: faker.address.country(),
    //     user_id: i+1

    //   });
    // }

    return queryInterface.bulkInsert('admins', [
      {
      name: faker.name.firstName(),
        surname: faker.name.lastName(),
        adress: faker.address.streetAddress(),
        country: faker.address.country(),
        user_id: 1
    },
    {
      name: faker.name.firstName(),
        surname: faker.name.lastName(),
        adress: faker.address.streetAddress(),
        country: faker.address.country(),
        user_id: 2
    }
  ], {});
 },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('admins', null, {});

 }
};


// segundo par de queryInterface:




    // let users = await queryInterface.sequelize.query('select id from users limit 1', {
    //   type: Sequelize.QueryTypes.SELECT
    // })

    // console.log(__filename, 'USERS-ADMIN', users)
    // return queryInterface.bulkInsert('admins', [{
    //   name: faker.name.firstName(),
    //   surname: faker.name.lastName(),
    //   user_id: users[0].id,
    // }], {});