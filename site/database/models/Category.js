module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories';
    let cols = {
        id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    };
    let config = {
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };
    const Category = sequelize.define(alias, cols, config)

    Category.associate = (models) => {
       Category.hasMany(models.Product, {
           as: "products",
           foreignKey: "category_id"
        })
    }

    return Category;
}