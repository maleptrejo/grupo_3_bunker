'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    return queryInterface.createTable('products', 
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
    price: {
      type: Types.DOUBLE(12,2).UNSIGNED,
      allowNull: false
    },
    description: {
      type: Types.TEXT
    },
    image: {
      type: Types.STRING(30)
    },
    stock: {
      type: Types.INTEGER(11),
      allowNull: false,
    },
    created_at: {
      type: Types.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Types.DATE
    },
    
  
});
    
  },

  down: (queryInterface, Types) => {
    return queryInterface.dropTable('products');
    
  }
};
