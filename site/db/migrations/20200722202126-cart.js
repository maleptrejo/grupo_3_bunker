'use strict';

module.exports = {
  up: (queryInterface, Types) => {
    return queryInterface.createTable('carts', {

      id: {
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
        }},
       status: {
         type: Types.BOOLEAN,
         allowNull: false,
       }, 
       total: {
        type: Types.DOUBLE(12,2).UNSIGNED,
        allowNull: false,
        defaultValue: 0
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
    
      return queryInterface.dropTable('carts');
    
    
  }
};
