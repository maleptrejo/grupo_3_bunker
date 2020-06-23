'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    return queryInterface.createTable('brands', {
      id: {
      type: Types.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
  name: {
      type: Types.STRING
  },
  created_at: {
    type: Types.DATE,
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
