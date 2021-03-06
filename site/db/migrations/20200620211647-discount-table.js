'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    return queryInterface.createTable('discounts', {
      id: {
        type: Types.BIGINT(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
      level: {
        type: Types.DOUBLE(3,2).UNSIGNED,
        unique: true,
        allowNull: false
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

  down: (queryInterface, Types) => {
    return queryInterface.dropTable('discounts');
  }
};
