module.exports = (sequelize, dataTypes) => {
    let alias = 'Discounts';
    let cols = {
        id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        level: {
            type: dataTypes.DOUBLE(3,2)
        }
    };
    let config = {
        tableName: 'discounts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };
    const Discount = sequelize.define(alias, cols, config)

    Discount.associate = (models) => {
       Discount.hasMany(models.Product, {
           as: "Products",
           foreignKey: "discount_id"
        })
    }

    return Discount;
}