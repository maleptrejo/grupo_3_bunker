module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100)
        },
        price: {
            type: dataTypes.DOUBLE(12,2).UNSIGNED
        },
        description: {
            type: dataTypes.TEXT
        },
        //ojo! agregué la imagen!!
        image: {
            type: dataTypes.STRING(30)
        },
        //
        brand_id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            references: {model: 'Brands', key: 'id'},
                onDelete:'CASCADE'
        },
        discount_id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            references: {model: 'Discounts', key: 'id'},
                onDelete:'CASCADE'
        },
        category_id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            references: {model: 'Categories', key: 'id'},
                onDelete:'CASCADE'
        },
        stock: {
            type: dataTypes.INTEGER(11)
        }
    };
    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };
    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models) => {
       Product.belongsTo(models.Brands, {
           as: "brands",
           foreignKey: "brand_id"
       })
       Product.belongsTo(models.Discounts, {
            as: "Discounts",
            foreignKey: "discount_id"
        })
        Product.belongsTo(models.Categories, {
            as: "categories",
            foreignKey: "category_id"
        })
    }

    return Product;
}