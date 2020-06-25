module.exports = (sequelize, dataTypes) => {
    let alias = 'Discounts';
    let cols = {
        id: {
            type: dataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        level: {
            type: dataTypes.DOUBLE
        }
    };
    let config = {
        tableName: 'brands',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };
    const Discount = sequelize.define(alias, cols, config)

    Discount.associate = (models) => {
       Discount.hasMany(models.Products, {
           as: "products",
           foreignKey: "discount_id"
        })
    }

    return Discount;
}