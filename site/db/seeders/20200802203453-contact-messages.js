'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('contact', [
      {
      id: 1,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    },
    {
      id: 2,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    }, 
    {
      id: 3,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    }, 
    {
      id: 4,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    }, 
    {
      id: 5,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    }, 
    {
      id: 6,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    }, 
    {
      id: 7,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    },   
    {
      id: 8,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    }, 
    {
      id: 9,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    }, 
    {
      id: 10,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    }, 
    {
      id: 11,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    }, 
    {
      id: 12,      
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(2),
      status: true
    }
    ],{});  
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('contact', null, {});
  }
};
