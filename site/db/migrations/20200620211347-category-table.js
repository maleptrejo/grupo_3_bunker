'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    return queryInterface.createTable('categories', {
    id: {
        type: Types.BIGINT(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Types.STRING(100),
        unique: true,
        allowNull: false
    },
    image: {
      type: Types.STRING(100),
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
    return queryInterface.dropTable('categories');
    
  }
};
