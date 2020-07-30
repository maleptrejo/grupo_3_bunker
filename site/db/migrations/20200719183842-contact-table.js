'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    return queryInterface.createTable("contact",
    { id: {
      type: Types.BIGINT(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
      },
      name: {
        type: Types.STRING(100),
        allowNull: false
      },
      surname: {
        type: Types.STRING(100),
        allowNull: false,
      },
      email: {
        type: Types.STRING(150),
        allowNull: false,
        unique: true
      },
      message: {
        type: Types.TEXT
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
    return queryInterface.dropTable('contact');
  }
};

