'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    return queryInterface.createTable('favoritos', 
    { id: {
      type: Types.BIGINT(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    
    user_id:{
          
      type: Types.BIGINT(20).UNSIGNED,
      allowNull: false,
      references: {
          model: 'users',
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
    created_at: {
      type: Types.DATE,
      allowNull: false,
      defaultValue: Types.literal('NOW()'),
    },
    updated_at: {
      type: Types.DATE,
      defaultValue: Types.literal('NOW()'),
    },
    
  
});
    
  },

  down: (queryInterface, Types) => {
    return queryInterface.dropTable('favoritos');
    
  }
};
