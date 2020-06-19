'use strict';
const faker =require('faker');
var bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      
      return queryInterface.bulkInsert('Users', [
        {
        email: 'admin@admin.com',
        password: bcrypt.hashSync('12345678', 10),
        avatar: '1591583562923.jpg'
      },
      {
        email: faker.internet.email(),
        password: bcrypt.hashSync('12345678', 10),
        avatar: '1591744954745.jpg'
      },
      {
        email: faker.internet.email(),
        password: bcrypt.hashSync('12345678', 10),
        avatar: '1591744954745.jpg'
      },
      {
        email: faker.internet.email(),
        password: bcrypt.hashSync('12345678', 10),
        avatar: '1591744954745.jpg'
      },
      {
        email: faker.internet.email(),
        password: bcrypt.hashSync('12345678', 10),
        avatar: '1591744954745.jpg'
      }
      
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Users', null, {});
    
  }
};
