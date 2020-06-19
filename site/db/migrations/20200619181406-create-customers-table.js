'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    
      return queryInterface.createTable('customers', { 
    id: {
        type: Types.BIGINT(20).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Types.STRING(100),
        allowNull: false,

    },
    surname: {
        type: Types.STRING(100),
        allowNull: false,
    },
    adress: {
        type: Types.STRING(100),
        allowNull: false,
    },
    country: {
        type: Types.STRING(100),
        allowNull: false,

    },
     });
   
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('customers');
    
  }
};
