module.exports = (sequelize, dataTypes) => {
    let alias = 'Brands';
    let cols = {
        id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100).UNSIGNED,
            unique: true
        }
    };
    let config = {
        tableName: 'brands',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };
    const Brand = sequelize.define(alias, cols, config)

    Brand.associate = (models) => {
       Brand.hasMany(models.Product, {
           as: "products",
           foreignKey: "brand_id"
        })
    }

    return Brand;
}