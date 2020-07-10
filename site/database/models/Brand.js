module.exports = (sequelize, dataTypes) => {
    let alias = `Brands`;
    let cols = {
        id: {
            type: dataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: `brands`,
        timestamps: true,
        createdAt: `created_at`,
        updatedAt: `updated_at`
    };
    const Brand = sequelize.define(alias, cols, config)

    Brand.associate = (models) => {
       Brand.hasMany(models.Products, {
           as: "products",
           foreignKey: "brand_id"
        })
    }

    return Brand;
}