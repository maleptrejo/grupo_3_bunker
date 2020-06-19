'use strict';

module.exports = {
  up: (queryInterface, Types) => {
   
      return queryInterface.addColumn(
        'gatos',
        'user_id',
        {
          type: Types.BIGINT(20).UNSIGNED,
          allowNull: false,
         
          onDelete:'CASCADE',
          references: {
              model: 'dueños',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          OnDelete: 'SET NULL',

        }
       );
    },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.removeColumn('gatos',
      'user_id');
   
  }
};
