module.exports= (sequelize, Types) => {
    const Users=sequelize.define (
        //alias
        'Users',

         //columns
        {
            id: {
                type: Types.BIGINT(20).UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            email: {
                type: Types.STRING(150),
                allowNull: false,
                unique: true

            },
            password: {
                type: Types.STRING(150)

            },
            avatar: {
                type: Types.STRING(100)
            }
        },
    
        //config
        {tableName: "users",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        }

        )

        Users.associate=function(models) {
            Users.hasOne(models.Customer, {
                foreignKey: 'user_id',
                as: 'Customer'
            }),
            Users.hasOne(models.Admin, {
                foreignKey: 'user_id',
                as: 'Admin'
            })

        }

      
        
        return Users;
}