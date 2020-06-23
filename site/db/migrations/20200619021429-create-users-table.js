/*'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    
      return queryInterface.createTable('users', { 
    id: {
        type: Types.BIGINT(20).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Types.STRING(150),
        allowNull: false,
        unique: true

    },
    password: {
        type: Types.STRING(150)

    },
    avatar: {
        type: Types.STRING(100)
    } });
   
  },

  down: (queryInterface, Types) => {
    
      return queryInterface.dropTable('users');
    
  }
};*/