`use strict`;

module.exports = {
  up: (queryInterface, Types) => {
    
      return queryInterface.createTable(`admins`, {  id: {
        type: Types.BIGINT(20).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Types.STRING(100),
        allowNull: false,

    },
    surname: {
        type: Types.STRING(100),
        allowNull: false,
    },
    created_at: {
      type: Types.DATE,
      allowNull: false,
      
     
  },
  updated_at: {
      type: Types.DATE,
  }
 });

  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable(`admins`);
 
  }
};
