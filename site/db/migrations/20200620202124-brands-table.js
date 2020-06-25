'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    return queryInterface.createTable('brands', {
      id: {
      type: Types.BIGINT(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
  name: {
      type: Types.STRING(100),
      allowNull:false,
      unique: true

  },
  created_at: {
    type: Types.DATE,
    allowNull: false
  },
  updated_at: {
    type: Types.DATE
  }
 });
    
  },

  down: (queryInterface, Types) => {
    return queryInterface.dropTable('brands');
    
  }
};
