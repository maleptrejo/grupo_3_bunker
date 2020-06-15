module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
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
        tableName: 'products',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config)

    // Product.associate = (models) => {
    //    Producto.belongsTo(models.Brand, {
    //        as: "brands",
    //        foreignKey: "brand_id"
    //    })
    //    Product.belongsTo(models.Discount, {
    //     as: "discounts",
    //     foreignKey: "discount_id"
    //    })
    //    Product.belongsTo(models.Category, {
    //     as: "categories",
    //     foreignKey: "category_id"
    //    })
    // }

    return Product;
}