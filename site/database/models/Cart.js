module.exports = (sequelize, Types) => {
    const Cart = sequelize.define(
        //alias
        'Carts',

        //columns
        {
            id: {
                type: Types.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            user_id: {
                type: Types.BIGINT,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
            },
            status: {
                type: Types.BOOLEAN,
                allowNull: false,
            },
            total: {
                type: Types.DOUBLE,
                allowNull: false
              },

        },

        //config
        {
            tableName: "carts",
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }

    )

    Cart.associate = function (models) {
        Cart.belongsTo(models.Users, {
            foreignKey: 'user_id',
            as: 'users'
        })
        Cart.belongsToMany(models.Products, {
            as: 'products',
            through: 'cart_prod',
            foreignKey: 'cart_id',
            otherKey:'product_id'
        })
        // *****
        // Cart.belongsTo(models.Cart_prod, {
        //     foreignKey: 'cart_id',
        //     as: 'carts'
        // })
    }

    return Cart;
}