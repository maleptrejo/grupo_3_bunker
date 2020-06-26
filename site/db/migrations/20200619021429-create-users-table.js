'use strict';

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
    },
    created_at: {
        type: Types.DATE,
        allowNull: false,
        defaultValue: Types.literal('NOW()'),
        
       
    },
    updated_at: {
        type: Types.DATE,
        defaultValue: Types.literal('NOW()'),
    }
 });
   
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('users');
    
  }
};