module.exports = (sequelize, Types) => {
    const Admin = sequelize.define(
        //alias
        'Admins',

        //columns
        {
            id: {
                type: Types.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Types.STRING,
                allowNull: false,

            },
            name: {
                type: Types.STRING,
                allowNull: false,
            },


            user_id: {
                type: Types.BIGINT,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
            },


        },

        //config
        {
            tableName: "admins",
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }

    )

    Admin.associate = function (models) {
        Admin.belongsTo(models.Users, {
            foreignKey: 'user_id',
            as: 'users'
        })
    }

    return Admin;
}