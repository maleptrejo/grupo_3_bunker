'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    return queryInterface.createTable('products', 
    { id: {
      type: Types.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Types.STRING
    },
    price: {
      type: Types.DOUBLE
    },
    description: {
      type: Types.TEXT
    },
    stock: {
      type: Types.INTEGER
    },
    created_at: {
      type: Types.DATE,
    },
    updated_at: {
      type: Types.DATE
    },
    brand_id: {
      type: Types.BIGINT,
      onDelete: "CASCADE",
      references: {
        models: "brands",
        key: "id"
      }
    },
    category_id: {
        type: Types.BIGINT,
        onDelete: "CASCADE",
        references: {
          models: "categories",
          key: "id"
        }
    },
    discount_id: {
      type: Types.BIGINT,
      onDelete: "CASCADE",
      references: {
        models: "discounts",
        key: "id"
      }
    }
  
});
    
  },

  down: (queryInterface, Types) => {
    return queryInterface.dropTable('products');
    
  }
};
