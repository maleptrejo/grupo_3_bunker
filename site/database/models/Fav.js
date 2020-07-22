module.exports = (sequelize, dataTypes) => {
    let alias = `Favs`;
    let cols = {
        id: {
            type: dataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
    };
    let config = {
        tableName: `favoritos`,
        timestamps: true,
        createdAt: `created_at`,
        updatedAt: `updated_at`
    };
    const Fav = sequelize.define(alias, cols, config)

    Fav.associate = (models) => {
       Fav.belongsTo(models.Users, {
           as: "users",
           foreignKey: "user_id"
       })
       Fav.belongsTo(models.Products, {
            as: "products",
            foreignKey: "product_id"
        })
    }

    return Fav;
}