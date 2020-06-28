'use strict';
const faker = require('faker');
var bcrypt = require('bcrypt');
const db = require('../../database/models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let user = await db.Users.create({
      email: faker.internet.email(),
      password: bcrypt.hashSync('12345678', 10),
      avatar: '1591744954745.jpg',
    }, {
      include: ['admins']
    })
    
    let admin = user.setAdmins({
      user_id : user.id
    })

    console.log("USER", user)
    console.log("ADMIN", admin)


    // let users = [];

    // for (let i = 1; i < 10; i++) {
    //   users.push({
    //     email: faker.internet.email(),
    //     password: bcrypt.hashSync('12345678', 10),
    //     avatar: '1591744954745.jpg',
    //   })
    // }

    // let query = queryInterface.bulkInsert('Users', users, {
    //   returning: true
    // })

    // console.log('QUERY', query)

    return queryInterface
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};