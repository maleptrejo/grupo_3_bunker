module.exports = (sequelize, dataTypes) => {
    let alias = `Products`;
    let cols = {
        id: {
            type: dataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DOUBLE
        },
        description: {
            type: dataTypes.TEXT
        },
        image1: {
            type: dataTypes.STRING
        },
        image2: {
            type: dataTypes.STRING
        },
        image3: {
            type: dataTypes.STRING
        },
        brand_id: {
            type: dataTypes.BIGINT
        },
        discount_id: {
            type: dataTypes.BIGINT
        },
        category_id: {
            type: dataTypes.BIGINT
        },
        stock: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: `products`,
        timestamps: true,
        createdAt: `created_at`,
        updatedAt: `updated_at`
    };
    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models) => {
       Product.belongsTo(models.Brands, {
           as: "brands",
           foreignKey: "brand_id"
       })
       Product.belongsTo(models.Discounts, {
            as: "discounts",
            foreignKey: "discount_id"
        })
        Product.belongsTo(models.Categories, {
            as: "categories",
            foreignKey: "category_id"
        })
        Product.hasMany(models.Favs, {
            as:"favs",
            foreignKey: "product_id"
        })
    }

    return Product;
}