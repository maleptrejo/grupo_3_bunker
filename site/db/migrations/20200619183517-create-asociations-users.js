`use strict`;

module.exports = {
  up: (queryInterface, Types) => {

      return queryInterface.addColumn(
        `customers`,
        `user_id`,
        {
          type: Types.BIGINT(20).UNSIGNED,
          allowNull: false,
          references: {
              model: `users`,
              key: `id`
          },
        // OnUpdate: 'CASCADE',
          OnDelete: 'SET NULL',

        }
       )
       .then (() => {
        return queryInterface.addColumn(
          'admins',
          'user_id',
          {
            type: Types.BIGINT(20).UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },

            OnDelete: 'SET NULL',
            // OnUpdate: 'CASCADE',
          }
          );
       });
    },

  down: (queryInterface, Sequelize) => {

      return queryInterface.removeColumn('customers',
      'user_id')
      .then (()=> {
        return queryInterface.removeColumn(`admins`,
      `user_id`)
      });

  }
};
