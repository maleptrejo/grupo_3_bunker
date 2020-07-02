'use strict';

module.exports = {
  up: (queryInterface, Types) => {
   return Promise.all([
      queryInterface.addColumn (
        'products',
        'brand_id', {
          
            type: Types.BIGINT(20).UNSIGNED,
            allowNull: false,
            references: {
                model: 'brands',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            OnDelete: 'SET NULL',

        }
      ),
      queryInterface.addColumn (
        'products',
        'category_id', {
          
            type: Types.BIGINT(20).UNSIGNED,
            allowNull: false,
            references: {
                model: 'Categories',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            OnDelete: 'SET NULL',

        }
      ),
      queryInterface.addColumn (
        'products',
        'discount_id', {
          
            type: Types.BIGINT(20).UNSIGNED,
            allowNull: false,
            references: {
                model: 'Discounts',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            OnDelete: 'SET NULL',

        }
      ),
      



   ]);
  },

  down: (queryInterface, Types) => {
    return Promise.all([
      queryInterface.removeColumn('products', 'brand_id'),
      queryInterface.removeColumn('products', 'category_id'),
      queryInterface.removeColumn('products', 'discount_id')
    ]);
  }
};
