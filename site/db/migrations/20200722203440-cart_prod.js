'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    return queryInterface.createTable('cart_prod', 
    { id: {
      type: Types.BIGINT(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    
    cart_id:{
          
      type: Types.BIGINT(20).UNSIGNED,
      allowNull: false,
      references: {
          model: 'carts',
          key: 'id'
      }
  },
  product_id:{
          
    type: Types.BIGINT(20).UNSIGNED,
    allowNull: false,
    references: {
        model: 'products',
        key: 'id'
    }
},
    qty: {
      type: Types.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1

      
    },
    price: {
      type: Types.DOUBLE(12,2).UNSIGNED,
      allowNull: false,
      defaultValue: Types.INTEGER(0)
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
    return queryInterface.dropTable('cart_prod');
    
  }
};
