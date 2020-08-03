module.exports = (sequelize, Types) => {
    const Cart_prod = sequelize.define(
        //alias
        'Cart_prod',

        //columns
        {
            id: {
                type: Types.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            product_id: {
                type: Types.BIGINT,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id'
                },
            },
            cart_id: {
                type: Types.BIGINT,
                allowNull: false,
                references: {
                    model: 'Carts',
                    key: 'id'
                },
            },
          
            qty: {
                type: Types.INTEGER,
                allowNull: false,
                defaultValue: 1
              },
              price: {
                type: Types.DOUBLE(12,2).UNSIGNED,
                allowNull: false,
                defaultValue: 0
              },

        },

        //config
        {
            tableName: "cart_prod",
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }

    )
// *****
    // Cart_prod.associate = function (models) {
    //     Cart_prod.hasMany(models.Carts, {
    //         foreignKey: 'cart_id',
    //         as: 'carts'
    //     })
    //     Cart_prod.hasMany(models.Products, {
    //         foreignKey: 'product_id',
    //         as: 'products'
    //     })
    // }

    return Cart_prod;
}